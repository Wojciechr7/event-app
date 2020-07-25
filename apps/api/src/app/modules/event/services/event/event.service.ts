import { HttpService, Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { EventModel } from "../../models/event.model";
import { CreateEventDTO } from "../../../../../../../../libs/api-interfaces/src/lib/dto/create-event.dto";
import { catchError } from "rxjs/operators";

@Injectable()
export class EventService {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<EventModel>,
    private httpService: HttpService
  ) {
  }

  getAllEvents(): Promise<EventModel[]> {
    return this.eventModel.find().exec();
  }

  async addEvent(createEventDTO: CreateEventDTO): Promise<EventModel> {
    const newEvent = await new this.eventModel(createEventDTO);

    return newEvent.save();
  }

  async updateEvent(eventId: string, createEventDTO: CreateEventDTO): Promise<EventModel> {
    const newEvent = await this.eventModel.findByIdAndUpdate(eventId, createEventDTO, { new: true });
    return newEvent.save();
  }

  async createNotification(): Promise<any> {
    this.httpService.post('https://fcm.googleapis.com/fcm/send',
      {
        "notification": {
          "title": "cześć",
          "body": "tu robcio :) v2"
        },
        "to": "/topics/all"
      },
      {
        headers: {
          "Authorization": "key=AAAAid4goBo:APA91bHTYuLboDJ-fMDVvPoIJXmbQKoNVk_71kX62XGov3iYIyw6AvcXyMczeGS2GxKOINPfFDTyb98EQ-9h_Qf3HqV3if3bfHz4qn7XwT9vBAp8iu_epHWP8uQRoOs28H_mmBOx3mJq",
          "Content-Type": "application/json"
        }
      }
    ).pipe(
      catchError(e => {
        console.log(e)
        return e;
      })
    )
      .subscribe(v => {
        console.log(v)
      });

    return 'done';
  }

}
