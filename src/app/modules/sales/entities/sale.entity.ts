import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { SaleItem } from "./sale-Item.entity";
import { BaseEntity } from "src/app/core/repositories/entity/base.entity";

@Entity('sale')
export class Sale extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    totalAmount: number;

    @Column()
    itemCount: number;

    @ManyToOne(() => User, user => user.sales)
    user: User

    @OneToMany(() => SaleItem, saleItem => saleItem.sale)
    saleItems: SaleItem[];
}