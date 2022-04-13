import {File} from "./file";
import {UserApp} from "./user-app";

export class Task {
  id!: number;
  teacherLogin!: UserApp;
  textOfTask!: string;
  dateCreate!: Date;
  taskName!: string;
  taskSubject!: string;
  attachedFiles!: File[];
}
