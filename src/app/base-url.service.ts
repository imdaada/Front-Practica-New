import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseURLService {

  constructor() { }

  getURL(): string {
    return 'http://46.173.223.211:8080/'
  }
}
