import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { Note } from './entities/note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from 'src/tag/tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), TagModule],
  controllers: [NoteController],
  providers: [NoteService],
  exports: [NoteService]
})
export class NoteModule { }
