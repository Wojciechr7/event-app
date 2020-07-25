import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Event extends Document {

  @Prop()
  name: string;

  @Prop()
  month: number;

  @Prop()
  day: number;

  @Prop()
  condition: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
