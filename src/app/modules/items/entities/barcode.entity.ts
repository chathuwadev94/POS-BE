import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./item.entity";

@Entity('barcode')
export class Barcode {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    type: number;

    @OneToOne(() => Item, item => item.barcode)
    item: Item;
}