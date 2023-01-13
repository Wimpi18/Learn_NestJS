import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idUser: number

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
}