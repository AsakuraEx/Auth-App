import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RolEntity } from "./rol.entity";

@Entity({name: 'mnt_usuarios'})
export class UsuarioEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 120, nullable: false})
    nombre: string;

    @Column({ type: 'varchar', length: 120, nullable: false})
    apellido: string;

    @Column({type: 'varchar', length: 100, nullable: false})
    email: string;

    @Column({ type: 'varchar', length: 25, nullable: false})
    documento: string;

    @Column({type: 'varchar', length: 20, nullable: true})
    telefono: string;

    @Column({ type: 'text', nullable: false})
    contraseña: string;

    @Column({type: 'bool', default: true})
    activo: boolean;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @ManyToOne(()=> RolEntity, roles => roles.roles)
    @JoinColumn({name: 'rol_id'})
    rol_id: number;


}