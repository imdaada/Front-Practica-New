import {Task} from "./task";
import {UserApp} from "./user-app";
import {File} from "./file";

export class CurrentTask {
  id!: number;
  taskId!: Task;
  dateOfGive!: Date;
  dateOfLastChange!:Date;
  closed!: boolean;
  taken!: boolean;
  answerOnTask!: string;
  feedback!: string;
  limitDate!: Date;
  studentLogin!:UserApp;
  teacherLogin!: UserApp;
  grade!: boolean;
  attachedFiles!: File[];
}
