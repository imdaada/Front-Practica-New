import {Task} from "./task";
import {CurrentTask} from "./current-task";
import {File} from "./file";
import {Group} from "./group";

export class UserApp {
  login!: string;
  password!: string;
  role!: string;
  firstName!: string;
  surname!: string;
  email!: string;
  createdTasks!: Task[];
  emittedTasks!: CurrentTask[];
  group!: Group[];
  takenTasks!:CurrentTask[];
  files!: File[];
}
