import { ApiProperty } from "@nestjs/swagger";
import { IUser } from "../../user/interfaces/user.interface";
import { Gender } from "src/app/core/enums/gender.enum";

export class LoginResDto implements IUser {
    @ApiProperty({ type: String, description: 'User Id' })
    id: string;

    @ApiProperty({ type: String, description: 'User First Name' })
    firstName: string;

    @ApiProperty({ type: String, description: 'User last name' })
    lastName: string;

    @ApiProperty({ type: String, description: 'User nic' })
    nic: string;

    @ApiProperty({ enum: Gender, type: String, description: 'User gender' })
    gender: string;

    @ApiProperty({ type: String, description: 'User email' })
    email: string;

    @ApiProperty({ type: String, description: 'User address' })
    address: string;

    @ApiProperty({ type: String, description: 'User status' })
    status: number;


    @ApiProperty({ type: String, description: 'User access token' })
    accessToken?: string;

    @ApiProperty({ type: String, description: 'User reresh token' })
    refreshToken?: string;
}

