import { NoteToTag } from 'src/note-to-tags/entities/note-to-tag.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Tag {
    @PrimaryGeneratedColumn({ name: 'tagID' })
    tagID: number;

    @Column({ length: 30, name: 'nameTag' })
    nameTag: string;

    @Column({ name: "userID", update: false })
    user: number; //Corregir este debería ser userID

    @ManyToOne(type => User, user => user.notes, { cascade: true })
    @JoinColumn({ name: "userID" })
    userID: User; //Corregir este debería ser user

    @OneToMany(type => NoteToTag, (noteToTag) => noteToTag.tags)
    tags: NoteToTag[];
}
