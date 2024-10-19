import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { Barcode } from "./barcode.entity";
import { Stock } from "../../warehouse/entities/stock.entity";

@Entity('item')
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    unitPrice: number

    @Column()
    cost: number;

    @Column()
    image: string;

    @Column()
    manufactur: string;

    @ManyToOne(() => Category, category => category.item)
    category: Category

    @OneToOne(() => Barcode, barcode => barcode.item)
    barcode: Barcode;

    @OneToOne(() => Stock, stock => stock.item)
    stock: Stock
}