import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {Task} from './task';
import {TaskService} from './task.service';
import {CookieService} from 'ngx-cookie-service';
import {timeSinceInMicros} from '@angular/compiler-cli/src/ngtsc/perf/src/clock';
import {UserApp} from "./user-app";
import {File} from "./file";
import {FileService} from "./file.service";
import {CurrentTask} from "./current-task";
import {CurrentTaskService} from "./current-task.service";
import {ServerDateService} from "./server-date.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BaseURLService} from "../base-url.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  currentTime: Date = new Date();
  role: string = "";
  newTask: Task = new Task();
  users: UserApp[] = [];
  tasks: Task[] = [];
  tasksCopy: Task[] = [];
  create: boolean = false;
  emit: boolean = false;
  created: boolean = false;
  emitted: boolean = false;
  newFiles: File[] = [];
  grade:boolean = false;
  fileName: string = 'Имя файла';
  fileApiLink: string = this.baseURLService.getURL() + 'file/upload';
  sortByName: boolean = false;
  baseURL: string = this.baseURLService.getURL();

  currentTasks: CurrentTask[] = [];
  currentTasksCopy: CurrentTask[] = [];
  newCurrentTask: CurrentTask = new CurrentTask();

  createForm = new FormGroup({
    name: new FormControl(''),
    subject: new FormControl(''),
    text: new FormControl('')
  });

  emitForm = new FormGroup({
    login: new FormControl(''),
    num: new FormControl(''),
    date: new FormControl('')
  });

  resetBtn() {
    this.create = false;
    this.emit = false;
    this.emitted = false;
    this.created = false;
  }
  setCreate() {
    this.resetBtn();
    this.create = !this.create;
  }

  setEmit() {
    this.resetBtn();
    this.emit = !this.emit;
  }

  setCreated() {
    this.resetBtn();
    this.created = !this.created;
  }

  setEmitted() {
    this.resetBtn();
    this.emitted = !this.emitted;
  }

  getDate() {
    this.serverDateService.getDate().subscribe(value => {
      this.currentTime = value;
    });
  }

  constructor(private userService: UserService, private taskService: TaskService,
              private cookieService: CookieService,
              private fileService: FileService,
              private currentTaskService: CurrentTaskService,
              private serverDateService: ServerDateService,
              private baseURLService :BaseURLService) {
  }

  onUploadFile(file: File) {
    this.newFiles.push(file);
    console.log(file);
  }

  deleteLastFile(files: File[]) {
    let tmp = files.pop();
    if (tmp !== undefined)
      this.fileService.deleteFile(tmp).subscribe(() => {
      }, error => {
        alert('Не удалось');
      })
  }

  timeToView(time: Date): String {
    if (time != null)
      return time.toString().slice(11, 19) + ' ' + time.toString().slice(8, 10) + '-' + time.toString().slice(5, 7) + '-' + time.toString().slice(0, 4);
    else
      return "ff";
  }

  ngOnInit(): void {
    this.userService.role().subscribe(value => {
        console.log(value);
        this.role = value.role;
        if (this.role === 'ROLE_TEACHER')
          this.getTasks();
      },
      error => {
        console.log(error);
      });
    this.newTask = new Task();
    this.users = [];
    this.tasks = [];
    this.newCurrentTask.taskId = new Task();
    this.newCurrentTask.studentLogin = new UserApp();
    this.getCurrentTasks();
    this.getDate();
  }

  submit() {
    this.newTask.teacherLogin = new UserApp();
    this.taskService.addTask(this.newTask).subscribe((task: Task) => {
        console.log(task);
        console.log(this.newFiles);
        let files = this.newFiles;
        this.newFiles = [];
        files.forEach(value => {
          this.fileService.setTask(value, task).subscribe((file: File) => {

          });
        });
        this.getTasks();
        this.create = false;
      },
      error => {
        console.log(error);
        alert("Не удалось создать задание!");
      });
  }

  insertLogin(login: string) {
    this.newCurrentTask.studentLogin.login = login;
    this.users = [];
  }

  findLogin() {
    this.taskService.getUserByLogin(this.newCurrentTask.studentLogin.login).subscribe(
      (users: UserApp[]) => {
        this.users = users;
        console.log(users);
      },
      error => {
      }
    );
  }

  deleteTask(task: Task) {
    const conf = confirm('Удалить задние №' + task.id);
    if (conf) {
      this.taskService.deleteTask(task).subscribe(
        value => {
          this.getTasks();
        }, error => {
          alert('Не удалось');
        }
      );
    }
  }

  getTasks() {
    this.taskService.getTask().subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
        this.tasksCopy = tasks;
        console.log(tasks);
      },
      error => {
        alert("Не удалось загрузить список созданных заданий");
      }
    );
  }

  getCurrentTasks() {
    this.currentTaskService.getTask().subscribe(
      (tasks: CurrentTask[]) => {
        this.currentTasks = tasks;
        this.currentTasksCopy = tasks;
        console.log(tasks);
      },
      error => {
        alert("Не удалось загрузить список созданных заданий");
      }
    );
  }

  change(task: Task) {
    this.taskService.changeTask(task).subscribe(
      value => {
        this.getTasks();
      }, error => {
        alert('Не удалось');
      }
    );
  }

  emitTask() {
    this.currentTaskService.addTask(this.newCurrentTask).subscribe(value => {
      this.getCurrentTasks();
      this.emit = false;
      console.log(value);
    }, error => {
      alert("Не удалось создать задание!");
    });
  }

  changeCurrentTask(currentTask: CurrentTask) {
    if (this.role === 'ROLE_TEACHER') {
      currentTask.grade = this.grade;
    }
    this.currentTaskService.changeTask(currentTask).subscribe(value => {
      if (this.role === 'ROLE_STUDENT') {
        let files = this.newFiles;
        this.newFiles = [];
        files.forEach(value => {
          this.fileService.setCurrentTask(value, currentTask).subscribe((file: File) => {

          });
        });
      }
      this.getCurrentTasks();
    }, error => {
      alert("Не удалось");
    });

  }

  setDaNet(stat: boolean): string {
    return stat ? "Да" : "Нет";
  }

  sortCurrentTaskByDate() {
    this.currentTasks.sort(((a, b) => {
      if (a.dateOfLastChange < b.dateOfLastChange)
        return 1;
      else
        return -1;
    }));
  }

  sortCurrentTaskByCloseDate() {
    this.currentTasks.sort(((a, b) => {
      if ((a.limitDate < b.limitDate)&&!a.closed&&!b.closed)
        return -1;
      else if (!a.closed&&!b.closed)
        return -1;
      else if (!a.closed&&b.closed)
        return -1;
      else
        return 1;
    }));
  }

  sortCurrentTaskByTaken() {
    this.currentTasks.sort(((a, b) => {
      if (a.taken && !a.grade && !a.closed)
        return -1;
      else
        return 1;
    }));
  }

  sortTaskByDate() {
    this.tasks.sort(((a, b) => {
      if (a.dateCreate < b.dateCreate)
        return 1;
      else
        return -1;
    }));
  }

  sortTaskByName() {
    if (this.sortByName) {
      this.tasks.sort(((a, b) => {
        if (a.taskName > b.taskName)
          return 1;
        else
          return -1;
      }));
      this.sortByName = !this.sortByName;
    } else {
      this.tasks.sort(((a, b) => {
        if (a.taskName > b.taskName)
          return -1;
        else
          return 1;
      }));
      this.sortByName = !this.sortByName;
    }
  }
}
