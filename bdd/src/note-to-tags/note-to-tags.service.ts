import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteService } from 'src/note/note.service';
import { TagService } from 'src/tag/tag.service';
import { Repository } from 'typeorm';
import { CreateNoteToTagDto } from './dto/create-note-to-tag.dto';
import { UpdateNoteToTagDto } from './dto/update-note-to-tag.dto';
import { NoteToTag } from './entities/note-to-tag.entity';


@Injectable()
export class NoteToTagsService {
  constructor(
    @InjectRepository(NoteToTag) private readonly noteToTagRepository: Repository<NoteToTag>,
    private noteService: NoteService,
    private tagService: TagService
  ) { }

  // Podemos asignar una etiqueta que existe a una nota que también existe
  async addTagToNote(noteID: number, tagID: number, userID: number) {
    const note = await this.noteService.getNoteByID(noteID, userID);
    const tag = await this.tagService.getTagByID(tagID, userID);
    if (note && tag) {
      const newNoteToTag = this.noteToTagRepository.create({ notes: note, tags: tag });
      return this.noteToTagRepository.save(newNoteToTag);
    }
    return;
  }
  // Podemos eliminar una etiqueta que existe y está asignada a una nota que también existe
  async deleteTagToNote(noteID: number, tagID: number, userID: number) {
    const note = await this.noteService.getNoteByID(noteID, userID);
    const tag = await this.tagService.getTagByID(tagID, userID);
    if (note && tag) {
      return await this.noteToTagRepository.delete({ noteID: noteID, tagID: tagID });
    }
    return;
  }

  // Me permite ordenar todas las notas que tienen una nota específica
  async orderNotesByTag(userID: number, tagID: number): Promise<NoteToTag[]> {
    return await this.noteToTagRepository.createQueryBuilder('notetotag')
      .leftJoinAndSelect("notetotag.notes", "notes") //Comprender mejor lo del alias
      .where('noteToTag.tagID = :tagID', { tagID })
      .andWhere('notes.userID = :userID', { userID })
      .orderBy("notes.modificationDate", "DESC")
      .getMany()
  }

  // Devuelve todas las etiquetas de una nota específica
  async getTagsdByNote(userID: number, noteID: number) {
    return await this.noteToTagRepository.createQueryBuilder('notetotag')
      .select(["notetotag.tagID", "notetotag.tags"])
      .leftJoinAndSelect("notetotag.tags", "tags")
      .leftJoin("notetotag.notes", "notes")
      .where("notes.userID = :userID", { userID })
      .andWhere('notetotag.noteID = :noteID', { noteID })
      .getMany()
  }

}
