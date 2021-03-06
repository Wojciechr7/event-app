import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EventDTO } from "../../../../../../../libs/api-interfaces/src/lib/dto/event.dto";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private http: HttpClient
  ) { }

  getCalendar(): Observable<EventDTO[]> {
    return this.http.get<EventDTO[]>(`${environment.apiUrl}/event`);
  }

}
