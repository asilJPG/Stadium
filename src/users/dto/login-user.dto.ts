import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { IsEmail } from "sequelize-typescript";

export class LoginUserDto {
  @ApiProperty({
    example: "example@Email.com",
    description: "User email",
  })
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
