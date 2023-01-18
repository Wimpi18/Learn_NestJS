import { Note } from 'src/note/entities/note.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable, PrimaryColumn, Index, SubjectRemovedAndUpdatedError } from 'typeorm';

@Entity({ name: 'notetotag' })
// @Index(["firstColumn", "secondColumn"], { unique: true})
export class NoteToTag {
    @PrimaryGeneratedColumn()
    noteToTagID: number;

    @ManyToOne(type => Note, (note) => note.notes, { cascade: true, })
    @JoinColumn({ name: 'noteID' })
    notes: Note;

    @ManyToOne(type => Tag, (tag) => tag.tags, { cascade: true })
    @JoinColumn({ name: 'tagID' })
    tags: Tag;
}
