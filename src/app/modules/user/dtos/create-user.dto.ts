import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Gender } from "src/app/core/enums/gender.enum";

export class CreateUserDto {

    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'First of the user',
        required: true,
    })
    firstName: string;

    @ApiProperty({
        type: String,
        description: 'Last Name of the user',
        required: false,
    })
    lastName: string;

    @ApiProperty({
        type: String,
        description: 'NIC of the user',
        required: true,
    })
    nic: string;

    @ApiProperty({
        enum: Gender,
        type: String,
        description: 'Gender of the user',
        required: true,
    })
    gender: string;

    @ApiProperty({
        type: String,
        description: 'Address of the user',
        required: true,
    })
    address: string;

    @ApiProperty({
        type: String,
        description: 'Email of the user',
        required: false,
    })
    email: string;

    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'User Name of the user',
        required: true,
    })
    userName: string;

    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'Password of the user',
        required: true,
    })
    password: string;

    roles?: string[];
}