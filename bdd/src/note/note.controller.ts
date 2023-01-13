import { Controller, Get, Post, Body, Patch, Query, Delete } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) { }

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.createNote(createNoteDto);
  }

  @Get()
  findAll() {
    return this.noteService.getNotes();
  }

  /* @Get(':noteID')
  findOne(@Query('noteID') noteID: number) {
    return this.noteService.getNoteByID(noteID);
  } */

  @Get(':statusNote')
  findByStatus(@Query('statusNote') statusNote: string) {
    return this.noteService.getNotesByStatus(statusNote);
  }

  @Patch(':noteID')
  update(@Query('noteID') noteID: number, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.updateNote(noteID, updateNoteDto);
  }

  @Delete(':noteID')
  remove(@Query('noteID') noteID: number) {
    return this.noteService.removeNote(noteID);
  }
}
