import { type } from 'os';
import { Tag } from 'src/tag/entities/tag.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    idNota: number;

    @Column({
        nullable: false,
    })
    fechaCreacion: Date;

    @Column({
        nullable: false,
    })
    fechaModificacion: Date;

    @Column({
        nullable: false,
    })
    estadoNota: Date;

    @ManyToOne(type => User, user => user.notes, { cascade: true })
    @JoinColumn({ name: "User_ID" })
    user: User

    @OneToMany(type => Tag, (tag) => tag.note)
    tags: Tag[]
}
