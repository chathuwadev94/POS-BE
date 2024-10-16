import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumberString, IsOptional } from "class-validator";

export class PageRequest {
    @ApiPropertyOptional()
    @IsNumberString()
    @IsOptional()
    page?: number;

    @ApiPropertyOptional()
    @IsNumberString()
    @IsOptional()
    limit?: number;

    @ApiPropertyOptional()
    @ApiProperty()
    readonly searchBy?: string;

    @ApiPropertyOptional()
    @ApiProperty()
    readonly projection?: string;

    @ApiPropertyOptional()
    @ApiProperty()
    @IsOptional()
    sort?: string;
}