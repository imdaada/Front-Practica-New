import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from "./task";
import {Observable} from "rxjs";
import {CurrentTask} from "./current-task";
import {BaseURLService} from "../base-url.service";

@Injectable({
  providedIn: 'root'
})
export class CurrentTaskService {
  url = this.baseURLService.getURL() + 'currenttask';
  constructor(private httpClient: HttpClient, private baseURLService :BaseURLService) { }
  public addTask(currentTask: CurrentTask): Observable<any> {
    return this.httpClient.post(this.url + '/addTask', currentTask);
  }
  public deleteTask(currentTask: CurrentTask): Observable<any> {
    return this.httpClient.post(this.url + '/delete', currentTask);
  }
  public getTask(): Observable<any> {
    return this.httpClient.get(this.url + '');
  }
  public changeTask(currentTask: CurrentTask): Observable<any> {
    return this.httpClient.post(this.url + '/change', currentTask)
  }


}
