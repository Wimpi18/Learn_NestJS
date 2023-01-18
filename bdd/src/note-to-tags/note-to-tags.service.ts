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

  async addTagToNote(noteID: number, tagID: number, userID: number) {
    const note = await this.noteService.getNoteByID(noteID, userID);
    const tag = await this.tagService.getTagByID(tagID, userID);
    if (note && tag) {
      const newNoteToTag = this.noteToTagRepository.create({ notes: note, tags: tag });
      return this.noteToTagRepository.save(newNoteToTag);
    }
    return 'No se pudo guardar el Many to Many';
  }

  deleteTagToNote(tagID: number) {
    return `Eliminar etiqueta de nota`;
  }
}
