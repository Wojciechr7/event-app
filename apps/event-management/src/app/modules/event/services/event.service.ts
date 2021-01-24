import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { EventDTO } from "../../../../../../../libs/api-interfaces/src/lib/dto/event.dto";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import {CreateEventDTO} from "../../../../../../../libs/api-interfaces/src/lib/dto/create-event.dto";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient
  ) { }

  getCalendar(): Observable<EventDTO[]> {
    return this.http.get<EventDTO[]>(`${environment.apiUrl}/event`);
  }

  addEvent(event: CreateEventDTO): Observable<EventDTO> {
    return this.http.post<EventDTO>(`${environment.apiUrl}/event`, event);
  }

  putEvent(event: CreateEventDTO, eventId: string): Observable<EventDTO> {
    return this.http.put<EventDTO>(`${environment.apiUrl}/event/${eventId}`, event);
  }

  deleteEvent(eventId: string): Observable<string> {
    return this.http.delete<string>(`${environment.apiUrl}/event/${eventId}`);
  }

}
