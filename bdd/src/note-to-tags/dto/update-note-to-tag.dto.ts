import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteToTagDto } from './create-note-to-tag.dto';

export class UpdateNoteToTagDto extends PartialType(CreateNoteToTagDto) {}
