import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/tag/entities/tag.entity';
import { TagService } from 'src/tag/tag.service';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>,
    private tagService: TagService,
  ) { }

  async getNoteByID(noteID: number, userID: number) {
    const note = await this.noteRepository.createQueryBuilder('note')
      .where('noteID = :noteID', { noteID })
      .andWhere("userID = :userID", { userID })
      .getOne();
    if (!note) {
      throw new NotFoundException("Recurso no encontrado");
    }
    return note;
  }

  async getNotesByStatus(statusNote: string, userID: number) {
    return await this.noteRepository.createQueryBuilder("note")
      .where("statusNote = :statusNote", { statusNote })
      .andWhere("userID = :userID", { userID })
      .getMany();
  }

  async getNotes(userID: number): Promise<Note[]> {
    return await this.noteRepository.createQueryBuilder('note')
      .where('userID=:userID', { userID })
      .getMany();
  }

  async createNote(createNoteDto: CreateNoteDto, user: User) {
    createNoteDto.userID = user;
    const note = this.noteRepository.create(createNoteDto);
    return this.noteRepository.save(note);
  }

  async addTagToNote(noteID: number, userID: number, body: Tag) {
    const note = await this.getNoteByID(noteID, userID); //Para verificar si existe la nota
    const tags = await this.tagService.getTags(userID); //Para verificar si existe la etiqueta
    /* console.log('Tags en la BDD', tags); */
    /* console.log('Tags body', body.map()); */
    
    this.noteRepository.merge(note, body);
    return this.noteRepository.save(note);
  }

  async deleteTagToNote(noteID: number, userID: number, body: Tag) {
    const note = await this.getNoteByID(noteID, userID);
    this.noteRepository.merge(note, body);
    return this.noteRepository.save(note);
  }

  async updateNote(noteID: number, updateNoteDto: UpdateNoteDto) {
    return await this.noteRepository.update(noteID, updateNoteDto);
  }

  async removeNote(noteID: number) {
    return await this.noteRepository.delete(noteID);
  }
}
