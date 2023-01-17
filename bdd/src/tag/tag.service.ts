import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private readonly tagRepository: Repository<Tag>) { }

  async getTagByID(tagID: number) {
    const tag = await this.tagRepository.createQueryBuilder('tag')
      .where('tagID = :tagID', { tagID })
      .getOne();
    if (!tag) {
      throw new NotFoundException("Recurso no encontrado");
    }
    return tag;
  }

  async getTags(userID: number): Promise<Tag[]> {
    return await this.tagRepository.createQueryBuilder('tag')
    .where('userID = :userID', {userID})
    .getMany();
  }

  async createTag(createTagDto: CreateTagDto) {
    const tag = this.tagRepository.create(createTagDto);
    return this.tagRepository.save(tag);
  }

  async updateTag(tagID: number, updateTagDto: UpdateTagDto) {
    return await this.tagRepository.update(tagID, updateTagDto);
  }

  async removeTag(tagID: number) {
    return await this.tagRepository.delete(tagID);
  }
}
