import { Tag } from "src/tag/entities/tag.entity"
import { User } from "src/user/entities/user.entity"

export class CreateNoteDto {
    noteID: number;
    titleNote: string;
    contentNote: string;
    statusNote: string;
    creationDate: Date;
    modificationDate: Date;
    userID: User;
}
