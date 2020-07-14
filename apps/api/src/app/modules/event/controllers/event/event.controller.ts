import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { EventService } from "../../services/event/event.service";
import { CreateEventDTO } from "../../../../../../../../libs/api-interfaces/src/lib/dto/create-event.dto";

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('all')
  getData(): string {
    return this.eventService.getAllEvents();
  }

  @Post('/create')
  async addEvent(@Res() res, @Body() createEventDTO: CreateEventDTO) {
    const event = await this.eventService.addEvent(createEventDTO);
    return res.status(HttpStatus.OK).json({
      message: "Event has been created successfully",
      event
    })
  }

}
