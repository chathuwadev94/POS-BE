import { ApiProperty } from "@nestjs/swagger";
import { IUser } from "../interfaces/user.interface";

export class UserResponseDto implements IUser {
  @ApiProperty({ type: String, description: 'UserID' })
  id?: string;

  @ApiProperty({ type: String, description: 'User FirstName' })
  firstName: string;

  @ApiProperty({ type: String, description: 'User NIC' })
  nic: string;

  @ApiProperty({ type: String, description: 'User Gender' })
  gender: string;

  @ApiProperty({ type: String, description: 'User Address' })
  address: string;

  @ApiProperty({ type: String, description: 'User Current Status' })
  status: number;



}
