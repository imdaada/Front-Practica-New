import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) {
  }

  // Returns an observable
  upload(file: any, name: string, apiLink: string): Observable<any> {

    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file, file.name);
    formData.append("name", name);

    // Make http post request over api
    // with formData as req
    return this.http.post(apiLink, formData)
  }
}
