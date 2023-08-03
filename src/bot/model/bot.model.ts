import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface BotAttrs {
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  status: boolean;
}
@Table({ tableName: "bot" })
export class Bot extends Model<Bot, BotAttrs> {
  @ApiProperty({ example: 1, description: "Unique ID" })
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  user_id: number;

  @ApiProperty({ example: "UserName", description: "User name" })
  @Column({
    type: DataType.STRING,
  })
  username: string;

  @ApiProperty({ example: "Jon", description: "User first name" })
  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @ApiProperty({ example: "Doe", description: "User last Name" })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @ApiProperty({ example: "+998912345678", description: "User phone number" })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({ example: false, description: "User status" })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  status: boolean;
}
