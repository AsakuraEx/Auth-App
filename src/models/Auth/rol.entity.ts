import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PermisoEntity } from "./permiso.entity";
import { UsuarioEntity } from "./usuario.entity";

@Entity({name: 'ctl_roles'})
export class RolEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 50, nullable: false})
    nombre: string;

    @Column({type: 'varchar', length: 200, nullable: true})
    descripcion: string;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @ManyToMany(() => PermisoEntity)
    @JoinTable({name: 'mnt_roles_permisos'})
    permisos: PermisoEntity[];

    @OneToMany(()=> UsuarioEntity, usuario => usuario.rol_id)
    roles: RolEntity[];

}