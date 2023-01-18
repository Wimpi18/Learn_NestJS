import { Module } from '@nestjs/common';
import { NoteToTagsService } from './note-to-tags.service';
import { NoteToTagsController } from './note-to-tags.controller';
import { NoteService } from 'src/note/note.service';
import { NoteToTag } from './entities/note-to-tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteModule } from 'src/note/note.module';
import { TagModule } from 'src/tag/tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([NoteToTag]), NoteModule, TagModule],
  controllers: [NoteToTagsController],
  providers: [NoteToTagsService]
})
export class NoteToTagsModule { }
