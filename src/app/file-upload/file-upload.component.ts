import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileUploadService} from "./file-upload.service";
import {File} from "../tasks/file";
import {FileService} from "../tasks/file.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  constructor(private fileUploadService: FileUploadService,
              private fileService: FileService) { }

  @Input('fileName') name!:string;
  @Input() fileApiLink!:string;
  @Output() newFile = new EventEmitter<File>();
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: any = null; // Variable to store fil
  files: File[] = [];

  ngOnInit(): void {
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.upload(this.file, this.name, this.fileApiLink).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          // Short link via api response
          this.shortLink = event.link;
          this.loading = false; // Flag variable
          let newfile = new File();
          newfile.name = this.name;
          newfile.link = event.link;
          newfile.id = event.id;
          this.files.push(newfile);
          this.newFile.emit(newfile);
        }
      }
    );
  }

  deleteFile() {
    let tmp= this.files.pop();
    if (tmp !== undefined)
      this.fileService.deleteFile(tmp).subscribe(() => {
    })
  }
}
