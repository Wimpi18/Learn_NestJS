import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NoteToTagsService } from './note-to-tags.service';
import { CreateNoteToTagDto } from './dto/create-note-to-tag.dto';
import { UpdateNoteToTagDto } from './dto/update-note-to-tag.dto';
import { Query, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/entities/GetUser.decorator';
import { User } from 'src/user/entities/user.entity';

@UseGuards(AuthGuard())
@Controller('noteToTags')
export class NoteToTagsController {
  constructor(private readonly noteToTagsService: NoteToTagsService) { }

  /* @Get("all")
  getNotesAndTags(@GetUser() user: User, @Query('noteID') noteID: number) {
    return this.noteToTagsService.getNotesAndTags(user.userID, noteID);
  } */

  @Post()
  addTagToNote(@Body() { noteID, tagID }: { noteID: number, tagID: number }, @GetUser() user: User) {
    return this.noteToTagsService.addTagToNote(noteID, tagID, user.userID);
  }

  @Delete()
  deleteTagToNote(@Body() { noteID, tagID }: { noteID: number, tagID: number }, @GetUser() user: User) {
    return this.noteToTagsService.deleteTagToNote(noteID, tagID, user.userID);
  }

  @Get()
  orderNotesByTag(@GetUser() user: User, @Query('tagID') tagID: number) {
    return this.noteToTagsService.orderNotesByTag(user.userID, tagID);
  }
}