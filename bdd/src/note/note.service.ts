import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { States } from './entities/enumStates';
import { Note } from './entities/note.entity';


@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>) { }

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

  // Nos permite dividir las notas si es que están en bandeja, archivadas, en papelera o fijadas
  async getNotesByStatus(statusNote: string, userID: number) {
    return await this.noteRepository.createQueryBuilder("note")
      .where("statusNote = :statusNote", { statusNote })
      .andWhere("userID = :userID", { userID })
      .orderBy("modificationDate", "DESC")
      .getMany();
  }

  // Nos devuelve todas las notas de un usuario 
  async getNotes(userID: number): Promise<Note[]> {
    return await this.noteRepository.createQueryBuilder('note')
      // .leftJoinAndSelect("note.notes", "notes")
      .where('userID=:userID', { userID })
      .orderBy("modificationDate", "DESC")
      .getMany();
  }

  // Dada una palabra buscarla en nuestras notas, tanto en el título como en el contenido
  async searchInNote(search: string, userID: number) {
    const papelera: string = States.papelera;
    return await this.noteRepository.createQueryBuilder('note')
      .where('note.userID = :userID', { userID })
      .andWhere("note.statusNote != :papelera", { papelera })
      .andWhere(`(note.titleNote LIKE "%${search}%"`)
      .orWhere(`note.contentNote LIKE "%${search}%")`)
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
}
