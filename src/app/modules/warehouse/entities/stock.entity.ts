import { BaseEntity } from "src/app/core/repositories/entity/base.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Warehouse } from "./warehouse.entity";
import { StockStatus } from "../enums/status.enum";
import { Item } from "../../items/entities/item.entity";

@Entity('stock')
export class Stock extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    qty: number;

    @Column()
    warehouseId: number;

    @Column()
    itemId: number;

    @Column()
    unitPrice: number

    @Column({ type: Number, enum: StockStatus, default: StockStatus.OUT_OF_STOCK })
    status: number;

    @ManyToOne(() => Warehouse, warehouse => warehouse.stocks)
    warehouse: Warehouse;

    @ManyToOne(()=>Item,item=>item.stocks)
    item:Item

}