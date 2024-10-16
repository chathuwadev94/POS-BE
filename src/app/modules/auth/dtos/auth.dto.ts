import { ApiProperty } from "@nestjs/swagger";

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

