import { BaseEntity } from "src/app/core/repositories/entity/base.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Stock } from "./stock.entity";
import { Showroom } from "./showroom.entity";

@Entity('warehouse')
export class Warehouse extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    location: string;

    @Column()
    address: string;

    @Column()
    capacity: number;

    @OneToMany(() => Stock, stock => stock.warehouseId)
    stocks: Stock[];

    @OneToMany(() => Showroom, showroom => showroom.warehouse)
    showrooms: Showroom[];


}