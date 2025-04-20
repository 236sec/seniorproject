import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export type PricePointDocument = PricePoint & Document;

@Schema()
export class PricePoint {
  @Prop({ type: ObjectId, auto: true })
  id?: ObjectId;

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;
}

export const PricePointSchema = SchemaFactory.createForClass(PricePoint);
