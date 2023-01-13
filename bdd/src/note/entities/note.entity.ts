import { Tag } from 'src/tag/entities/tag.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Note {
    @PrimaryGeneratedColumn({ name: 'noteID' })
    noteID: number;

    @Column({
        nullable: false,
        name: 'titleNote'
    })
    titleNote: string;

    @Column({
        nullable: false,
        name: 'contentNote'
    })
    contentNote: string;

    @Column({
        nullable: false,
        name: 'creationDate'
    })
    creationDate: Date;

    @Column({
        nullable: false,
        name: 'modificationDate'
    })
    modificationDate: Date;

    @Column({
        nullable: false,
        name: 'statusNote',
        length: 15,
    })
    statusNote: string;

    @ManyToMany(() => Tag, { cascade: true })
    @JoinTable({ name: 'NoteToTag' })
    asignar: Tag[]

    @ManyToOne(type => User, user => user.notes, { cascade: true })
    @JoinColumn({ name: 'userID' })
    userID: User

    /* @OneToMany(type => Tag, (tag) => tag.note)
    tags: Tag[] */
}
