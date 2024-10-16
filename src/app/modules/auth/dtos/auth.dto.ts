import { ApiProperty } from "@nestjs/swagger";
import { AppRoles } from "src/app/core/enums/role.enum";
import { UserStatus } from "../../user/enums/status.enum";

export class LoginDto {
    @ApiProperty({
        type: String,
        description: 'User Name',
        required: true
    })
    userName: string

    @ApiProperty({
        type: String,
        description: 'Password',
        required: true
    })
    password: string
}




export class RefreshDto {

    @ApiProperty({
        type: String,
        description: 'Refresh Token',
        required: true
    })
    refreshToken: string
}


export class ChangePasswordDto {
    @ApiProperty({
        type: String,
        description: 'Old Password',
        required: true
    })
    oldPassword: string;

    @ApiProperty({
        type: String,
        description: 'New Password',
        required: true
    })
    newPassword: string;
}


export class ChangeRoleDto {

    @ApiProperty({
        type: [AppRoles],
        enum: AppRoles,
        description: 'Roles',
        required: true
    })
    role: string[]
}

export class ChangeStatusDto {

    @ApiProperty({
        type: Number,
        enum:UserStatus,
        description: 'Current Password',
        required: true
    })
    status: number;

}
