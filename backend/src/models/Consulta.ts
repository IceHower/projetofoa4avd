import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('consultas')
class Consulta {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    medic_name: string;

    @Column()
    pacient_name: string;

    @Column()
    speciality: string;

    @Column('time with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn() 
    updated_at: Date;
}


export default Consulta;