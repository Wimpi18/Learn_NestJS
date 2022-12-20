import { Note } from 'src/note/entities/note.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    idEtiqueta: string;

    @ManyToOne(type => Note, note => note.tags, { cascade: true })
    @JoinColumn({ name: "Note_ID" })
    note: Note
}
