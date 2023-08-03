import { ApiProperty } from "@nestjs/swagger";
import { INTEGER } from "sequelize";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserAttrs {
  first_name: string;
  last_name: string;
  username: string;
  hashed_password: string;
  telegram_link: string;
  email: string;
  phone: string;
  user_photo: string;
  birthday: Date;
  is_owner: boolean;
  is_active: boolean;
  hashed_refresh_token: string;
}
@Table({ tableName: "users" })
export class User extends Model<User, UserAttrs> {
  @ApiProperty({ example: 1, description: "Unique ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: "Karim", description: "User First name" })
  @Column({
    type: DataType.STRING,
  })
  first_name: string;
  @ApiProperty({ example: "Karimov", description: "User Last Name" })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;
  @ApiProperty({ example: "User1", description: "Uniq Username" })
  @Column({
    type: DataType.STRING,
  })
  username: string;
  @ApiProperty({ example: "Pa$$word12", description: "User password" })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;
  @ApiProperty({
    example: "http://t.me//farsh_geniy",
    description: "User telegram link",
  })
  @Column({
    type: DataType.STRING,
  })
  telegram_link: string;
  @ApiProperty({ example: "example@gmail.com", description: "User email" })
  @Column({
    type: DataType.STRING,
  })
  email: string;
  @ApiProperty({ example: "+998912345678", description: "User phone number" })
  @Column({
    type: DataType.STRING,
  })
  phone: string;
  @ApiProperty({ example: "photo link", description: "User Photo" })
  @Column({
    type: DataType.STRING,
  })
  user_photo: string;
  @ApiProperty({ example: "01.01.2000", description: "User birthday" })
  @Column({
    type: DataType.DATE,
  })
  birthday: Date;
  @ApiProperty({ example: "true or false", description: "User is owner?" })
  @Column({
    type: DataType.BOOLEAN,
  })
  is_owner: boolean;
  @ApiProperty({ example: "true or false", description: "User is active?" })
  @Column({
    type: DataType.BOOLEAN,
  })
  is_active: boolean;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;
  @Column({
    type: DataType.STRING,
  })
  activation_link: string;
}
