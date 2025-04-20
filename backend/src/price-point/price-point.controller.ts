import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PricePointService } from './price-point.service';
import { CreatePricePointDto } from './dto/create-price-point.dto';
import { UpdatePricePointDto } from './dto/update-price-point.dto';

@Controller('price-point')
export class PricePointController {
  constructor(private readonly pricePointService: PricePointService) {}

  @Post()
  create(@Body() createPricePointDto: CreatePricePointDto) {
    return this.pricePointService.create(createPricePointDto);
  }

  @Get()
  findAll() {
    return this.pricePointService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pricePointService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePricePointDto: UpdatePricePointDto,
  ) {
    return this.pricePointService.update(+id, updatePricePointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pricePointService.delete(+id);
  }
}
