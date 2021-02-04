import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {EventModule} from "./modules/event/event.module";
import {MongooseConnection} from './connection-strings';

@Module({
  imports: [
    //MongooseModule.forRoot('mongodb://localhost/event-app'),
    MongooseModule.forRoot(MongooseConnection),
    EventModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
