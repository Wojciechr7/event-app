import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { EventDTO } from "../../../../../../../libs/api-interfaces/src/lib/dto/event.dto";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

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

}
