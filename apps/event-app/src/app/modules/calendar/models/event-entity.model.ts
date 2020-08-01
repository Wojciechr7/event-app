import { EventDTO } from "../../../../../../../libs/api-interfaces/src/lib/dto/event.dto";

export interface EventEntityModel extends EventDTO {
  id: string;
  date: string;
  title: string;
}
