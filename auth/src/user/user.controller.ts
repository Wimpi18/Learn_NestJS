import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Query } from '@nestjs/common/decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  listar(){
    return this.userService.listar();
  }

  @Get(':userID')
  findOne(@Query('userID') userID: string) {
    return this.userService.findOneUser(userID);
  }

  @Patch(':userID')
  update(@Query('userID') userID: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(userID, updateUserDto);
  }

  @Delete(':userID')
  remove(@Query('userID') userID: string) {
    return this.userService.removeUser(userID);
  }
}
