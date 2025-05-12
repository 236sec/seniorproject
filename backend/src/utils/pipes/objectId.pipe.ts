import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ObjectIdValidationPipe
  implements PipeTransform<string, Types.ObjectId>
{
  transform(value: string): Types.ObjectId {
    // Check if the value is a valid MongoDB ObjectId
    const isValid = Types.ObjectId.isValid(value);

    if (!isValid) {
      throw new BadRequestException('Invalid ObjectId format');
    }

    // Convert string to MongoDB ObjectId
    return new Types.ObjectId(value);
  }
}
