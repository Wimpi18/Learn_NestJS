import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagDto } from 'src/tag/dto/create-tag.dto';
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
      .where('note.noteID = :noteID', { noteID })
      .andWhere("note.userID = :userID", { userID })
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

  async addTagToNote(noteID: number, userID: number, createTagDto: CreateTagDto) {
    const note = await this.noteRepository.createQueryBuilder('note')
      .where("note.userID = :userID", { userID })
      .andWhere("note.noteID = :noteID", { noteID })
      .leftJoinAndSelect("note.tags", "tag")
      .getOne();

    /* const newTags: Tag[] = Array.from(Object.values(createTagDto)[0]); //Con esto obtengo un arreglo de Tags
    newTags.forEach(tag => {
      note.tags.push(tag);
    }); */

    // console.log('Body', newTags);
    // const tagRepository = this.noteRepository.manager.getRepository(Tag);
    // const newTags = tagRepository.create(body);

    // console.log('Tags que se van a asignar', body)
    /* const newTag = new Tag();
    newTag.tagID = 2;  */
    // Debemos pasarle un arreglo de tags e iterarlos con ...newTags
    // note.tags.push(...newTags);

    return this.noteRepository.save(note);
  }

  /* async deleteTagToNote(noteID: number, userID: number, body: Tag) {
    const note = await this.getNoteByID(noteID, userID);
    this.noteRepository.merge(note, body);
    return this.noteRepository.save(note);
  } */

  async updateNote(noteID: number, updateNoteDto: UpdateNoteDto) {
    return await this.noteRepository.update(noteID, updateNoteDto);
  }

  async removeNote(noteID: number) {
    return await this.noteRepository.delete(noteID);
  }
}
