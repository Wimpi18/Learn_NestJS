import { Controller, Get, Post, Body, Patch, Query, Delete, UseGuards, Param } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { GetUser } from 'src/user/entities/GetUser.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) { }

  @Post()
  create(@Body() createNoteDto: CreateNoteDto, @GetUser() user: User) {
    return this.noteService.createNote(createNoteDto, user);
  }

  @Get()
  findAllNotes(@GetUser() user: User) {
    return this.noteService.getNotes(user.userID);
  }

  @Get('oneNote')
  findOne(@Query('noteID') noteID: number, @GetUser() user: User) {
    return this.noteService.getNoteByID(noteID, user.userID);
  }

  @Get('statusNote')
  findByStatus(@Query('statusNote') statusNote: string, @GetUser() user: User) {
    return this.noteService.getNotesByStatus(statusNote, user.userID);
  }

  @Get('search')
  searchInNote(@Query('search') search: string, @GetUser() user: User) {
    return this.noteService.searchInNote(search, user.userID);
  }

  @Patch()
  updateNote(@Query('noteID') noteID: number, @Body() updateTagDto: UpdateNoteDto, @GetUser() user: User) {
    return this.noteService.updateNote(noteID, updateTagDto, user.userID);
  }

  @Delete('delete')
  removeNote(@Query('noteID') noteID: number, @GetUser() user: User) {
    return this.noteService.removeNote(noteID, user.userID);
  }
}
