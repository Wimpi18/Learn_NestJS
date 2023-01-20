import { Controller, Get, Post, Body, Patch, Query, Delete, UseGuards } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { GetUser } from 'src/user/entities/GetUser.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Tag } from 'src/tag/entities/tag.entity';
import { CreateTagDto } from 'src/tag/dto/create-tag.dto';
import { NotImplementedException } from '@nestjs/common/exceptions';

@UseGuards(AuthGuard())
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) { }

  @Post()
  create(@Body() createNoteDto: CreateNoteDto, @GetUser() user: User) {
    return this.noteService.createNote(createNoteDto, user);
  }

  /* @Put()
  addTagToNote(@Query('noteID') noteID: number, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.addTagToNote(noteID, updateNoteDto);
  } */

  @Get()
  findAllNotes(
    @GetUser() user: User
  ) {
    return this.noteService.getNotes(user.userID);
  }
  // example
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

  @Patch('addTag')
  addTagToNote(@Query('noteID') noteID: number, @Body() createTagDto:CreateTagDto, @GetUser() user: User) {
    return this.noteService.addTagToNote(noteID, user.userID, createTagDto);
  }

  /* @Patch('deleteTag')
  deleteTagToNote(@Query('noteID') noteID: number, @Body() body: any, @GetUser() user: User) {
    return this.noteService.deleteTagToNote(noteID, user.userID, body);
  } */

  @Patch()
  updateNote(@Query('noteID') noteID: number, @Body() updateNoteDto: UpdateNoteDto, @GetUser() user: User) {
    return this.noteService.updateNote(noteID, updateNoteDto, user.userID);
  }

  @Delete('delete')
  removeNote(@Query('noteID') noteID: number, @GetUser() user: User) {
    return this.noteService.removeNote(noteID, user.userID);
  }

  @Get('orderByModificationDate')
  orderNotesByModificationDate(@Query('userID') userID: number) {
    return this.noteService.orderNotesByModificationDate(userID);
  }
}
