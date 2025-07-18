import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'ctl_roles'})
export class RolEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 50, nullable: false})
    nombre: string;

    @Column({type: 'varchar', length: 200, nullable: true})
    descripcion: string;

    @Column({type: 'timestamptz', default: new Date()})
    createdAt: Date;

    @Column({type: 'timestamptz', default: new Date()})
    updatedAt: Date;


}