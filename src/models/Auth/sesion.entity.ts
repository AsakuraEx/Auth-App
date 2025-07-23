import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UsuarioEntity } from "./usuario.entity";

@Entity({name: 'sesiones'})
export class SesionEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'text', nullable: false, unique: true })
    token: string;

    @Column({ type: 'text', nullable: true })
    refresh_token: string;

    @Column({ type: 'timestamptz', nullable: true })
    expiracion: Date;

    @Column({ type:'text', nullable: true })
    two_secret_password: string;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;

    @OneToOne(()=>UsuarioEntity)
    @JoinColumn({ name: 'id_usuario' })
    id_usuario: UsuarioEntity;


}