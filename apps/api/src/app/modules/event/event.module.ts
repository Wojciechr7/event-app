import { HttpModule, Module } from '@nestjs/common';
import { EventController } from "./controllers/event/event.controller";
import { EventService } from "./services/event/event.service";
import { MongooseModule } from "@nestjs/mongoose";
import { EventSchema } from "./schemas/event.schema";

@Module({
  imports: [
    //MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
    HttpModule
  ],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule {}
