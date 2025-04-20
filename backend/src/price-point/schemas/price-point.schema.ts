import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PricePointDocument = PricePoint & Document;

@Schema()
export class PricePoint {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;
}

export const PricePointSchema = SchemaFactory.createForClass(PricePoint);
