import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagDto } from 'src/tag/dto/create-tag.dto';
import { Tag } from 'src/tag/entities/tag.entity';
import { TagService } from 'src/tag/tag.service';
import { GetUser } from 'src/user/entities/GetUser.decorator';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { isNumberObject } from 'util/types';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>,
    private tagService: TagService,
  ) { }
  // example
  async getNoteByID(noteID: number, userID: number) {
    const note = await this.noteRepository.createQueryBuilder('note')
      .leftJoinAndSelect("note.notes", "notes")
      .where('note.noteID = :noteID', { noteID })
      .andWhere("note.userID = :userID", { userID })
      .orderBy("modificationDate", "DESC")
      .getOne();
    if (!note) {
      throw new NotFoundException("Recurso no encontrado");
    }
    return note;
  }

  // Mejorar este para facilitar el trabajo a Mariana
  async getTagsByNote(userID: number) {
    const notes = await this.noteRepository.createQueryBuilder('note')
      .leftJoinAndSelect("note.notes", "notes")
      .where('userID=:userID', { userID })
      .orderBy("modificationDate", "DESC")
      .getMany();
    // return notes;
    let tags: Tag[];
  
    notes.forEach(note => {
      note.notes.forEach(async element => {
        const tag = await this.tagService.getTagByID(element.tagID, userID);
        // console.log(tag);
        tags.push(tag);
      });
    });
    console.log(tags);
    return notes;
    // const tags = await this.tagService.getTagByID(notes)
    /* const note = await this.noteRepository.createQueryBuilder('note')
      .leftJoinAndSelect("note.notes", "notes")
      .where('userID=:userID', { userID })
      .orderBy("modificationDate", "DESC")
      .getMany();

    const tagsByNote = await this.noteRepository.manager.getRepository(Tag).createQueryBuilder('tag')
      .leftJoinAndSelect("note.notes", "notes")
      .where('userID=:userID', { userID })
      .orderBy("modificationDate", "DESC")
      .getMany();
    return note[0].notes[0].tagID; */
  }


  async getNotesByStatus(statusNote: string, userID: number) {
    return await this.noteRepository.createQueryBuilder("note")
      .where("statusNote = :statusNote", { statusNote })
      .andWhere("userID = :userID", { userID })
      .orderBy("modificationDate", "DESC")
      .getMany();
  }

  // Nos devuelve todas las notas de un usuario con sus respectivas etiquetas
  async getNotes(userID: number): Promise<Note[]> {
    return await this.noteRepository.createQueryBuilder('note')
      .leftJoinAndSelect("note.notes", "notes")
      .where('userID=:userID', { userID })
      .orderBy("modificationDate", "DESC")
      .getMany();
  }

  async searchInNote(search: string, userID: number) {
    return await this.noteRepository.createQueryBuilder('note')
      .select(["note.titleNote", "note.contentNote"])
      .where('userID = :userID', { userID })
      .andWhere(`note.titleNote LIKE "%${search}%"`)
      .orWhere(`note.contentNote LIKE "%${search}%"`)
      .getMany()
  }

  async createNote(createNoteDto: CreateNoteDto, user: User) {
    createNoteDto.userID = user;
    const note = this.noteRepository.create(createNoteDto);
    return this.noteRepository.save(note);
  }

  async updateNote(noteID: number, updateNoteDto: UpdateNoteDto, userID: number) {
    const note = await this.noteRepository.createQueryBuilder('note')
      .where('note.noteID = :noteID', { noteID })
      .andWhere("note.userID = :userID", { userID })
      .getOne();
    if (note) {
      return await this.noteRepository.update(note.noteID, updateNoteDto);
    } else {
      throw new NotFoundException("Recurso no encontrado");
    }
  }

  async removeNote(noteID: number, userID: number) {
    // verificamos existencia de la nota para el usr
    const note = await this.noteRepository.createQueryBuilder('note')
      .where('note.noteID = :noteID', { noteID })
      .andWhere("note.userID = :userID", { userID })
      .getOne();
    if (note) {
      return await this.noteRepository.delete(note.noteID);
    } else {
      throw new NotFoundException("Recurso no encontrado");
    }
  }

  /* Ordenar notas de acuerdo a la fecha */
  async orderNotesByModificationDate(userID: number): Promise<Note[]> {
    const note = await this.noteRepository.createQueryBuilder('note')
      .where('userID=:userID', { userID })
      .orderBy("modificationDate", "DESC")
      .getMany();
    console.log(note);
    return note;
  }

}
