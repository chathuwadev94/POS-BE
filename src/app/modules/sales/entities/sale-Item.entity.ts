import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sale } from "./sale.entity";
import { Item } from "../../items/entities/item.entity";
import { BaseEntity } from "src/app/core/repositories/entity/base.entity";

@Entity('sale-item')
export class SaleItem extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    quantity: number;

    @Column()
    unitPrice:number;

    @Column()
    totalPrice:number;

    @ManyToOne(()=> Sale,sale=>sale.saleItems)
    sale:Sale

    @ManyToOne(()=>Item,item=>item.saleItems)
    item:Item
}