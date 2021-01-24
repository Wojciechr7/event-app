import { HttpService, Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { EventModel } from "../../models/event.model";
import { CreateEventDTO } from "../../../../../../../../libs/api-interfaces/src/lib/dto/create-event.dto";
import { catchError } from "rxjs/operators";
import * as moment from "moment";

@Injectable()
export class EventService {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<EventModel>,
    private httpService: HttpService
  ) {
  }

  async getAllEvents(): Promise<EventModel[]> {
    const allEvents = await this.eventModel.find().exec();
    return allEvents;
  }

  deleteAll() {
    const events = this.eventModel.deleteMany({ __v: 0 });
    return events;
  }

  async addEvent(createEventDTO: CreateEventDTO): Promise<EventModel> {
    const newEvent = await new this.eventModel(createEventDTO);

    return newEvent.save();
  }

  async updateEvent(eventId: string, createEventDTO: CreateEventDTO): Promise<EventModel> {
    const newEvent = await this.eventModel.findByIdAndUpdate(eventId, createEventDTO, { new: true });
    return newEvent.save();
  }

  async deleteEvent(eventId: string): Promise<EventModel> {
    return this.eventModel.findByIdAndDelete(eventId);
  }

  async createNotification(): Promise<any> {
    const momentDate = moment();

    const actualMonth: number = momentDate.get('month') + 1;
    const actualDay: number = momentDate.get('D');

    const allEvents = await this.eventModel.find().exec();

    let nextEvent: EventModel;

    allEvents.forEach((event: EventModel) => {
      if (event.month >= actualMonth) {
        if (event.day >= actualDay || (event.month > actualMonth)) {
          if (!nextEvent) {
            nextEvent = event;
          } else {
            if (nextEvent.month > event.month) {
              nextEvent = event;
            } else if (nextEvent.month === event.month) {
              if (nextEvent.day > event.day) {
                nextEvent = event;
              }
            }
          }
        }
      }
    });

    this.httpService.post('https://fcm.googleapis.com/fcm/send',
      {
        "notification": {
          "title": "Powiadomienie o nadchodzącym wydarzeniu",
          "body": `Wydarzenie: ${nextEvent ? nextEvent.name : 'brak'}`
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
