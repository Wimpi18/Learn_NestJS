import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  /* @Get(':userID')
  getPasswordByUsername(@Query('userID') userID: string) {
    return this.userService.getPasswordByUsername(userID);
  } */

  @Patch(':userID')
  update(@Query('userID') userID: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(userID, updateUserDto);
  }

  @Delete(':userID')
  remove(@Query('userID') userID: number) {
    return this.userService.removeUser(userID);
  }


}
