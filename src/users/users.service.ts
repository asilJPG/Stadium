import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { LoginUserDto } from "./dto/login-user.dto";
import { decode } from "punycode";
import { Op } from "sequelize";
import { FindUserDto } from "./dto/find-user.dto";
import { MailService } from "../mail/mail.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    private readonly jwtService: JwtService,
    private readonly mailservice: MailService
  ) {}
  async registration(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userRepo.findOne({
      where: { username: createUserDto.username },
    });
    if (user) {
      throw new BadRequestException("Username already exists");
    }
    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException("passwords is not match!");
    }
    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.userRepo.create({
      ...createUserDto,
      hashed_password: hashed_password,
    });
    const tokens = await this.getTokens(newUser);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_Token, 7);
    const uniqueKey: string = uuidv4();
    const updateUser = await this.userRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqueKey,
      },
      { where: { id: newUser.id }, returning: true }
    );
    res.cookie("refresh_token", tokens.refresh_Token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    try {
      await this.mailservice.sendUserConfirmation(updateUser[1][0]);
    } catch (error) {
      console.log(error);
    }
    const response = {
      message: "User refistred",
      user: updateUser[1][0],
      tokens,
    };
    return response;
  }
  async login(loginUseDrto: LoginUserDto, res: Response) {
    const { email, password } = loginUseDrto;
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException("User not registred");
    }
    const isMatchPass = await bcrypt.compare(password, user.hashed_password);
    if (!isMatchPass) {
      throw new UnauthorizedException("User not registred(pass)");
    }

    const tokens = await this.getTokens(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_Token, 7);
    const updateUser = await this.userRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: user.id }, returning: true }
    );
    res.cookie("refresh_token", tokens.refresh_Token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: "User logged in",
      user: updateUser[1][0],
      tokens,
    };
    return response;
  }
  async logout(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException("user not found");
    }
    const updateUser = await this.userRepo.update(
      {
        hashed_refresh_token: null,
      },
      { where: { id: userData.id }, returning: true }
    );
    res.clearCookie("refresh_token");
    const response = {
      message: "User logged out successfully",
      user: updateUser[1][0],
    };
    return response;
  }
  async refreshToken(user_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (user_id != decodedToken["id"]) {
      throw new BadRequestException("user not found");
    }
    const user = await this.userRepo.findOne({ where: { id: user_id } });
    if (!user || !user.hashed_refresh_token) {
      throw new BadRequestException("user not found");
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token
    );
    if (!tokenMatch) {
      throw new ForbiddenException("forbiden");
    }

    const tokens = await this.getTokens(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_Token, 7);
    const updateUser = await this.userRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: user.id }, returning: true }
    );
    res.cookie("refresh_token", tokens.refresh_Token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: "User refreshed",
      user: updateUser[1][0],
      tokens,
    };
    return response;
  }

  async getTokens(user: User) {
    const jwtpayload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtpayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtpayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
        // number hochet
      }),
    ]);
    return {
      access_Token: accessToken,
      refresh_Token: refreshToken,
    };
  }
  async findAll(findUserDto: FindUserDto) {
    const where = {};
    if (findUserDto.first_name) {
      where["first_name"] = {
        [Op.like]: `%${findUserDto.first_name}%`,
      };
    }

    if (findUserDto.last_name) {
      where["last_name"] = {
        [Op.like]: `%${findUserDto.last_name}%`,
      };
    }

    if (findUserDto.birthday_begin && findUserDto.birthday_begin) {
      where[Op.and] = {
        birthday: {
          [Op.between]: `%${
            findUserDto.birthday_begin && findUserDto.birthday_end
          }%`,
        },
      };
    } else if (findUserDto.birthday_begin) {
      where["birthday"] = {
        [Op.gte]: `%${findUserDto.birthday_begin}%`,
      };
    } else if (findUserDto.birthday_begin) {
      where["birthday"] = {
        [Op.gte]: `%${findUserDto.birthday_end}%`,
      };
    }
    const users = await User.findAll({ where });
    if (!users) {
      throw new BadRequestException("user not found");
    }
    return users;
  }
}
