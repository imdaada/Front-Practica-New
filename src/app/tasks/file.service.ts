import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {File} from "./file";
import {Task} from "./task";
import {CurrentTask} from "./current-task";
import {BaseURLService} from "../base-url.service";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  url = this.baseURLService.getURL() + 'file';
  constructor(private httpClient: HttpClient, private baseURLService :BaseURLService) { }

  public setTask(file: File, task: Task): Observable<any> {
    file.taskId = task;
    return this.httpClient.post(this.url + '/setTask', file);
  }

  public setCurrentTask(file: File, task: CurrentTask): Observable<any> {
    file.currentTaskId = task;
    return this.httpClient.post(this.url + '/setTask', file);
  }

  public deleteFile(file: File): Observable<any> {
    return this.httpClient.post(this.url + '/delete', file);
  }
}
