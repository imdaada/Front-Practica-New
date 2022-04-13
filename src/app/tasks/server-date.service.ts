import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CurrentTask} from "./current-task";
import {Observable} from "rxjs";
import {BaseURLService} from "../base-url.service";

@Injectable({
  providedIn: 'root'
})
export class ServerDateService {
  url = this.baseURLService.getURL();
  constructor(private httpClient: HttpClient, private baseURLService :BaseURLService) { }

  public getDate(): Observable<any> {
    return this.httpClient.get(this.url + 'date');
  }
}
