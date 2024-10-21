import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { Barcode } from "./barcode.entity";
import { Stock } from "../../warehouse/entities/stock.entity";
import { SaleItem } from "../../sales/entities/sale-Item.entity";
import { BaseEntity } from "src/app/core/repositories/entity/base.entity";

@Entity('item')
export class Item extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    cost: number;

    @Column()
    image: string;

    @Column()
    manufactur: string;

    @ManyToOne(() => Category, category => category.item)
    category: Category

    @OneToOne(() => Barcode, barcode => barcode.item,{cascade: true})
    @JoinColumn()
    barcode: Barcode;

    @OneToMany(() => Stock, stock => stock.item)
    stocks: Stock[]

    @OneToMany(() => SaleItem, saleItem => saleItem.item)
    saleItems: SaleItem[];
}