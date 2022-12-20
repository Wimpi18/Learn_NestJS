import { Note } from 'src/note/entities/note.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column({
    nullable: false,
    length: 15,
  })
  username: string

  @Column({
    nullable: false,
    length: 10,
  })
  password: string

  @OneToMany(type => Note, (note) => note.user)
  notes: Note[]
}