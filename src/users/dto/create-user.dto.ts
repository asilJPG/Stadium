import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MinLength,
} from "class-validator";
import { IsEmail } from "sequelize-typescript";

export class CreateUserDto {
  @ApiProperty({ example: "Karim", description: "User First name" })
  first_name: string;

  @ApiProperty({ example: "Karimov", description: "User Last Name" })
  last_name: string;

  @ApiProperty({ example: "User1", description: "Uniq Username" })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: "Pa$sword12", description: "User password" })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: "confirm password", description: "User password" })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  confirm_password: string;

  @ApiProperty({
    example: "http://t.me//farsh_geniy",
    description: "User telegram link",
  })
  telegram_link: string;

  @ApiProperty({ example: "example@gmail.com", description: "User email" })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: "+998912345678", description: "User phone number" })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: "photo link", description: "User Photo" })
  user_photo: string;

  @ApiProperty({ example: "01.01.2000", description: "User birthday" })
  @IsDateString()
  birthday: Date;
}
