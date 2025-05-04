import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PriceHistoryDocument = PriceHistory & Document;

export enum TimeInterval {
  MINUTE = 'minute',
  HOUR = 'hour',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

@Schema({ timestamps: false })
export class PriceHistory extends Document {
  @Prop({ required: true, index: true })
  symbol: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, enum: TimeInterval })
  interval: TimeInterval;

  @Prop({ type: Number, default: 0 })
  volume: number;

  @Prop({ type: Number })
  timestamp: number;
}

export const PriceHistorySchema = SchemaFactory.createForClass(PriceHistory);

PriceHistorySchema.index({ symbol: 1, timestamp: -1 });
