
import { BaseEntity } from "src/app/core/repositories/entity/base.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserStatus } from "../enums/status.enum";
import { Gender } from "src/app/core/enums/gender.enum";
import { AppRoles } from "src/app/core/enums/role.enum";

@Entity('user')
@Unique(['nic', 'userName'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ length: 100 })
    firstName: string;

    @Column({ length: 100, nullable: true })
    lastName: string;

    @Column({ length: 100 })
    nic: string;

    @Column({ type: 'enum', enum: Gender, nullable: true })
    gender: string;

    @Column({ length: 100 })
    email: string;

    @Column({ length: 100, nullable: true })
    address: string;

    @Column({ length: 100 })
    userName: string;

    @Column({ length: 200 })
    password: string;

    @Column({ type: 'varchar', array: true })
    roles: string[];

    @Column({ type: 'enum', enum: UserStatus, default: UserStatus.PENDING })
    status: number;


}