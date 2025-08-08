import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('mnt_cliente_api')
export class ClienteApiEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({type: 'varchar', length: 120, nullable: false})
    nombreCliente!: string;

    @Column({type: 'varchar', length: 120, nullable: false})
    servidor!: string;

    @Column({type: 'text', nullable: false})
    contraseñaCliente!: string;

    @Column({type: 'text', nullable: false})
    token?: string;

    @Column({type: 'boolean', default: true})
    habilitado?: boolean;

}