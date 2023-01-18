import { User } from "src/user/entities/user.entity";

export class CreateTagDto {
    tagID: number;
    nameTag: string;
    userID: User;
}
