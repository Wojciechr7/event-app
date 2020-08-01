import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { EventService } from "../../services/event/event.service";
import { CreateEventDTO } from "../../../../../../../../libs/api-interfaces/src/lib/dto/create-event.dto";
import { EventDTO } from "../../../../../../../../libs/api-interfaces/src/lib/dto/event.dto";
import { incorrectDateValidator } from "../../../../../../../../libs/base/src/lib/validators/incorrect-date.validator";

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  getData(): Promise<EventDTO[]> {
    return this.eventService.getAllEvents();
  }

  @Post()
  async addEvent(@Res() res, @Body() createEventDTO: CreateEventDTO) {
    if (incorrectDateValidator(createEventDTO.day, createEventDTO.month)) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: "Wrong date"
      });
    }

    const event = await this.eventService.addEvent(createEventDTO);

    return res.status(HttpStatus.OK).json({
      message: "Event has been created successfully",
      event
    });
  }

  @Put(':eventId')
  async updateEvent(@Res() res, @Param('eventId') eventId: string, @Body() createEventDTO: CreateEventDTO) {
    if (incorrectDateValidator(createEventDTO.day, createEventDTO.month)) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: "Wrong date"
      });
    }

    const event = await this.eventService.updateEvent(eventId, createEventDTO);

    return res.status(HttpStatus.OK).json({
      message: "Event has been updated successfully",
      event
    })
  }

  @Delete()
  deleteAllData(): string {
    return this.eventService.deleteAll();
  }

}
