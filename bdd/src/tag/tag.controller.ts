import { Controller, Get, Post, Body, Patch, Query, Delete, UseGuards, Param } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/entities/GetUser.decorator';
import { User } from 'src/user/entities/user.entity';

@UseGuards(AuthGuard())
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) { }

  @Post()
  createTag(@Body() createTagDto: CreateTagDto, @GetUser() user: User) {
    return this.tagService.createTag(createTagDto, user);
  }

  @Get()
  findAllTags(@GetUser() user: User) {
    return this.tagService.getTags(user.userID);
  }

  @Get('findOne')
  findOneTag(@Query('tagID') tagID: number, @GetUser() user: User) {
    return this.tagService.getTagByID(tagID, user.userID);
  }

  @Patch()
  updateTag(@Query('tagID') tagID: number, @Body() updateTagDto: UpdateTagDto, @GetUser() user: User) {
    return this.tagService.updateTag(tagID, updateTagDto, user.userID);
  }

  @Delete()
  removeTag(@Query('tagID') tagID: number, @GetUser() user: User) {
    return this.tagService.removeTag(tagID, user.userID);
  }

}
