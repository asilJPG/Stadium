import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Response } from "express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./models/user.model";
import { LoginUserDto } from "./dto/login-user.dto";
import { cookieGetter } from "../decorators/cookieGetter.decorator";
import { FindUserDto } from "./dto/find-user.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: "register user" })
  @ApiResponse({ status: 200, type: User })
  @Post("sigup")
  registration(
    @Body() createuserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.usersService.registration(createuserDto, res);
  }
  @ApiResponse({ status: 201, type: User })
  @Post("signin")
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.usersService.login(loginUserDto, res);
  }
  @Post("signout")
  logout(
    @cookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.usersService.logout(refreshToken, res);
  }
  @Post(":id/refresh")
  refresh(
    @Param("id") id: string,
    @cookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.usersService.refreshToken(+id, refreshToken, res);
  }
  @Post("find")
  findAll(@Body() FindUserDto: FindUserDto) {
    return this.usersService.findAll(FindUserDto);
  }
}
