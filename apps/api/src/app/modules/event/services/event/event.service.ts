import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { EventModel } from "../../models/event.model";
import { CreateEventDTO } from "../../../../../../../../libs/api-interfaces/src/lib/dto/create-event.dto";

@Injectable()
export class EventService {
  constructor(@InjectModel('Event') private readonly eventModel: Model<EventModel>) {
  }

  getAllEvents() {
    return 'test';
  }

  async addEvent(createEventDTO: CreateEventDTO): Promise<EventModel> {
    const newEvent = await new this.eventModel(createEventDTO);
    return newEvent.save();
  }

}
