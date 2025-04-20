import { ApiProperty } from '@nestjs/swagger';

export class UpdatePricePointDto {
  @ApiProperty({ required: false })
  readonly name?: string;

  @ApiProperty({ required: false })
  readonly description?: string;

  @ApiProperty({ required: false })
  readonly price?: number;
}
