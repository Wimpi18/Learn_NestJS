import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JWTPayload } from 'src/auth/JWTPayload.model';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
/* import * as bcrypt from 'bcrypt' */

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  /* async getPasswordByUsername(username: string) {
    const user = await this.userRepository.createQueryBuilder("user")
      .where("username = :userID", { userID: username })
      .getOne();
    if (!user) {
      throw new NotFoundException("Recurso no encontrado");
    }
    return user.password;
  } */

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    /* const hashed = await bcrypt.hash(createUserDto.password, 10); */
    /* createUserDto.password = hashed; */
    /* createUserDto.salt = await bcrypt.genSalt(); */
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async getUsers() {
    return await this.userRepository.find();
  }

  async findOneUser(userName: string): Promise<User> {
    return this.userRepository.createQueryBuilder('user')
      .where('username = :userName', { userName })
      .getOne();
  }

  async updateUser(userID: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(userID, updateUserDto);
  }

  async removeUser(userID: number) {
    return await this.userRepository.delete(userID);
  }

  validateJWTPayload(payload: JWTPayload): Promise<User> {
    const { usernameID } = payload;
    return this.findOneUser(usernameID);
  }

  // Validar si un usuario se ha registrado y devolverlo
  validateUser(username: string): Promise<User> {
    const qb = this.userRepository.createQueryBuilder('user');
    qb.where('user.username = :username', { username });
    return qb.getOne();
  }
}
