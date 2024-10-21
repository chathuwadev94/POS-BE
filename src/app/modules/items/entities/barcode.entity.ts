import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./item.entity";
import { BaseEntity } from "src/app/core/repositories/entity/base.entity";

@Entity('barcode')
export class Barcode extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    type: number;

    @OneToOne(() => Item, item => item.barcode)
    item: Item;
}