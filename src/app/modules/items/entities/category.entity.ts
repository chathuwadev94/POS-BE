import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./item.entity";

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Item, item => item.category)
    item: Item[];
}