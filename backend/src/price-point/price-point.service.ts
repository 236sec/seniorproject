import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreatePricePointDto } from './dto/create-price-point.dto';
import { UpdatePricePointDto } from './dto/update-price-point.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PricePoint, PricePointDocument } from './schemas/price-point.schema';
import { Model } from 'mongoose';

@Injectable()
export class PricePointService {
  constructor(
    @InjectModel(PricePoint.name)
    private pricePointModel: Model<PricePointDocument>,
  ) {}
  private readonly logger = new Logger(PricePointService.name);

  create(createPricePointDto: CreatePricePointDto) {
    const createdPricePoint = new this.pricePointModel(createPricePointDto);
    return createdPricePoint.save();
  }

  findAll(): Promise<PricePoint[]> {
    return this.pricePointModel.find().exec();
  }

  findOne(id: string): Promise<PricePoint | null> {
    return this.pricePointModel.findById(id).exec();
  }

  update(
    id: string,
    updatePricePointDto: UpdatePricePointDto,
  ): Promise<PricePoint | null> {
    return this.pricePointModel
      .findByIdAndUpdate(id, updatePricePointDto, {
        new: true,
      })
      .exec();
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const result = await this.pricePointModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`PricePoint with ID ${id} not found`);
      }
      return { message: 'Delete Successful' };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'An error occurred during deletion',
      );
    }
  }
}
