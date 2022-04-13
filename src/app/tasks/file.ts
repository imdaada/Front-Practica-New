import {CurrentTask} from "./current-task";
import {Task} from "./task";

export class File {
  id!: number;
  taskId!: Task;
  currentTaskId!: CurrentTask;
  link!: string;
  name!: string;
}
