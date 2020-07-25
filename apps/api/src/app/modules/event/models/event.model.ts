import { Document } from 'mongoose';

export interface EventModel extends Document {
  name: string;
  month: number;
  day: number;
  condition: string;
}
