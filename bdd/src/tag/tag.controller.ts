import { Controller, Get, Post, Body, Patch, Query, Delete } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.createTag(createTagDto);
  }

  @Get()
  findAll() {
    return this.tagService.getTags();
  }

  @Get(':tagID')
  findOne(@Query('tagID') tagID: number) {
    return this.tagService.getTagByID(tagID);
  }

  @Patch(':tagID')
  update(@Query('tagID') tagID: number, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.updateTag(tagID, updateTagDto);
  }

  @Delete(':tagID')
  remove(@Query('tagID') tagID: number) {
    return this.tagService.removeTag(tagID);
  }
}
