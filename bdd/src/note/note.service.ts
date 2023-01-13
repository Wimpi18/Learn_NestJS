import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NoteService {
  constructor(@InjectRepository(Note) private readonly noteRepository: Repository<Note>) { }

  async getNoteByID(noteID: number) {
    const note = await this.noteRepository.createQueryBuilder('note')
      .where('noteID = :noteID', { noteID })
      .getOne();
    if (!note) {
      throw new NotFoundException("Recurso no encontrado");
    }
    return note;
  }

  async getNotes(): Promise<Note[]> {
    return await this.noteRepository.find();
  }

  async createNote(createNoteDto: CreateNoteDto) {
    const note = this.noteRepository.create(createNoteDto);
    return this.noteRepository.save(note);
  }

  async updateNote(noteID: number, updateNoteDto: UpdateNoteDto) {
    return await this.noteRepository.update(noteID, updateNoteDto);
  }

  async removeNote(noteID: number) {
    return await this.noteRepository.delete(noteID);
  }

  async getNotesByStatus(statusNote: string) {
    return await this.noteRepository.createQueryBuilder("note")
      .where("statusNote = :statusNote", { statusNote })
      .getMany();
  }
}
