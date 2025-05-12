import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ObjectIdValidationPipe } from '../utils/pipes/objectId.pipe';
import { Types } from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const data = await this.usersService.create(createUserDto);
      return data;
    } catch (error) {
      if (error.message === 'User already exists') {
        return { message: 'User already exists' };
      } else if (error.message === 'Internal server error') {
        return { message: 'Internal server error' };
      } else {
        return { message: 'Unknown error' };
      }
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ObjectIdValidationPipe) id: Types.ObjectId) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
