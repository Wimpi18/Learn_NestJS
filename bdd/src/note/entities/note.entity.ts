import { NoteToTag } from 'src/note-to-tags/entities/note-to-tag.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany, UpdateDateColumn, CreateDateColumn } from 'typeorm';

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
        name: 'contentNote',
        length: 3000
    })
    contentNote: string;

    @Column({
        nullable: false,
        name: 'contentHTMLNote',
        type: 'mediumtext'
    })
    contentHTMLNote: string;

    @Column({
        nullable: false,
        name: 'creationDate',
        default: () => 'NOW()',
        update: false,
    })
    creationDate: Date;

    @Column({
        nullable: false,
        name: 'modificationDate',
        default: () => 'NOW()', //Genera por defecto la fecha y hora en base al servidor MySQL
    })
    @UpdateDateColumn()
    modificationDate: Date;

    @Column({
        nullable: false,
        name: 'statusNote',
        length: 15,
        default: "main"
    })
    statusNote: string;

    @ManyToOne(type => User, user => user.notes, { cascade: true })
    @JoinColumn({ name: 'userID' })
    userID: User;

    @OneToMany(type => NoteToTag, (noteToTag) => noteToTag.notes)
    notes: NoteToTag[];
}
