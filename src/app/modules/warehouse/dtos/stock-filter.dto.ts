import { IsNumberString } from "class-validator";
import { PageRequest } from "src/app/core/interfaces/page.request";

export class StockFilterDto extends PageRequest {
    
}

export class itemQtyIncrementDto {
    @IsNumberString()
    stockId:string;
    @IsNumberString()
    qty:string;
    @IsNumberString()
    itemId:string;
}