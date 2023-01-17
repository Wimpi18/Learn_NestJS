import { type } from 'os';
import { Note } from 'src/note/entities/note.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, ManyToOne, JoinColumn, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Tag {
    @PrimaryGeneratedColumn({ name: 'tagID' })
    tagID: number;

    @Column({ length: 30, name: 'nameTag' })
    nameTag: string;

    /* @ManyToOne(type => Note, note => note.tags, { cascade: true })
    @JoinColumn({ name: "note_ID" })
    note: Note */

    @ManyToOne(type => User, user => user.notes, { cascade: true })
    @JoinColumn({ name: "userID" })
    userID: User;

    /* @ManyToMany(type => Note)
    notes: Note[]; */
}
