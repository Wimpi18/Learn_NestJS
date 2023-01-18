import { NoteToTag } from 'src/note-to-tags/entities/note-to-tag.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';

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
        type: 'text'
    })
    contentNote: string;

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
    modificationDate: Date;

    @Column({
        nullable: false,
        name: 'statusNote',
        length: 15,
    })
    statusNote: string;

    /* Aplicar cascade para lo cual necesito un @ManytoMany en Tag
    https://www.youtube.com/watch?v=_FuBnlVxyF8 */
    /* @ManyToMany(() => Tag, { cascade: true})
    @JoinTable({
        name: 'notetotag',
        joinColumn: { name: 'note_ID' },
        inverseJoinColumn: { name: 'tag_ID' }
    })
    tags: Tag[]; */

    @ManyToOne(type => User, user => user.notes, { cascade: true })
    @JoinColumn({ name: 'userID' })
    userID: User;

    @OneToMany(type => NoteToTag, (noteToTag) => noteToTag.notes)
    notes: NoteToTag[];
}
