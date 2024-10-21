import { BaseEntity } from "src/app/core/repositories/entity/base.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Warehouse } from "./warehouse.entity";
import { User } from "../../user/entities/user.entity";

@Entity('showroom')
export class Showroom extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    warehouseId: number;

    @Column()
    location: string;

    @ManyToOne(() => Warehouse, warehouse => warehouse.showrooms)
    warehouse: Warehouse;

    @OneToMany(() => User, user => user.showroom)
    users: User[];


}