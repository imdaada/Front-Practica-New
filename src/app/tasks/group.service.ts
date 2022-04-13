import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CurrentTask} from "./current-task";
import {Observable} from "rxjs";
import {Group} from "./group";
import {GroupRecord} from "./group-record";
import {BaseURLService} from "../base-url.service";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  url = this.baseURLService.getURL() + 'group';
  constructor(private httpClient: HttpClient, private baseURLService :BaseURLService) { }
  public addGroup(group: Group): Observable<any> {
    return this.httpClient.post(this.url + '/add', group);
  }
  public deleteGroup(group: Group): Observable<any> {
    return this.httpClient.post(this.url + '/delete', group);
  }
  public getGroups(): Observable<any> {
    return this.httpClient.get(this.url + '');
  }
  public addGroupMember(groupRecord: GroupRecord): Observable<any> {
    return this.httpClient.post(this.url + '/addMembr', groupRecord);
  }
  public deleteGroupMember(groupRecord: GroupRecord): Observable<any> {
    return this.httpClient.post(this.url + '/deleteMembr', groupRecord);
  }
}
