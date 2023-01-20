import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private readonly tagRepository: Repository<Tag>) { }

  async getTagByID(tagID: number, userID: number) {
    const tag = await this.tagRepository.createQueryBuilder('tag')
      .where('tag.tagID = :tagID', { tagID })
      .andWhere('tag.userID = :userID', { userID })
      .getOne();
    if (!tag) {
      throw new NotFoundException("Recurso no encontrado");
    }
    return tag;
  }

  async getTags(userID: number): Promise<Tag[]> {
    return await this.tagRepository.createQueryBuilder('tag')
      .where('userID = :userID', { userID })
      .getMany();
  }

  async createTag(createTagDto: CreateTagDto, user: User) {
    createTagDto.userID = user;
    const note = this.tagRepository.create(createTagDto);
    return this.tagRepository.save(note);
  }

  createProvisionalTag(createTagDto: CreateTagDto, user: User) {
    const tag = this.tagRepository.create(createTagDto);
    return tag;
  }

  async updateTag(tagID: number, updateTagDto: UpdateTagDto, userID: number) {
    const note = await this.tagRepository.createQueryBuilder('note')
      .where('tagID = :tagID', { tagID })
      .andWhere("userID = :userID", { userID })
      .getOne();
    if(note) {
      return await this.tagRepository.update(tagID, updateTagDto);
    } else {
      throw new NotFoundException("Recurso no encontrado");
    }

  }

  async removeTag(tagID: number, userID: number) {
    const note = await this.tagRepository.createQueryBuilder('note')
      .where('tagID = :tagID', { tagID })
      .andWhere("userID = :userID", { userID })
      .getOne();
    if(note) {
      return await this.tagRepository.delete(tagID);  
    } else {
      throw new NotFoundException("Recurso no encontrado");
    }
    
  }
}
