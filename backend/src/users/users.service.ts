import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    try {
      const userDb = await createdUser.save();
      const { password, ...userWithoutPassword } = userDb.toObject();

      return userWithoutPassword;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error('User already exists');
      } else {
        throw new Error('Internal server error');
      }
    }
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findByUsername(username: string): Promise<{ mongoId: string }> {
    const user = (await this.userModel
      .findOne({ username })
      .exec()) as UserDocument;

    if (!user) {
      throw new Error('User not found');
    }

    const mongoId = user._id.toString();

    return { mongoId };
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: Types.ObjectId) {
    const user = (await this.userModel
      .findOne({ _id: id })
      .exec()) as UserDocument;

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
