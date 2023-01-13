import { Note } from 'src/note/entities/note.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({name:'userID'})
  userID: number

  @Column({
    length: 30,
    unique: true,
  })
  username: string

  @Column({
    nullable: false,
  })
  password: string

  @Column({
    nullable: false,
  })
  salt: string

  @OneToMany(type => Note, (note) => note.userID)
  notes: Note[]

  @OneToMany(type => Tag, (tag) => tag.userID)
  etiquetas: Tag[]
}