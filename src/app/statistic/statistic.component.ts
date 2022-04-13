import { Component, OnInit } from '@angular/core';
import {Task} from "../tasks/task";
import {CurrentTask} from "../tasks/current-task";
import {TaskService} from "../tasks/task.service";
import {CurrentTaskService} from "../tasks/current-task.service";
import {UserService} from "../user.service";
import {UserApp} from "../tasks/user-app";
import {Chart} from "chart.js";
import {ChartType} from "angular-google-charts";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  role: string = '';

  constructor(private taskService: TaskService,
              private currentTaskService: CurrentTaskService,
              private userService: UserService) { }
  tasks: Task[] = [];
  currentTasks: CurrentTask[] = [];
  currentTasksCopy: CurrentTask[] = [];
  users: UserApp[] = [];
  user: UserApp = new UserApp();
  chart: Chart<'pie', number[], string> | undefined;
  title = '';
  type = ChartType['PieChart'];
  data = [['Нет данных', 2]];
  columnNames = ['Name', 'Percentage'];
  options = {colors: ['#239d33',
      '#d90400',
      '#ff9f00',
      '#77666b']};
  width= 400;
  height = 400;

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
    this.getCurrentTasks();
  }

  getTasks() {
    this.taskService.getTask().subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
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
        this.data = [
          ['Оцененные задания', this.getNumOfGradedTask()],
          ['Просроченные задания', this.getNumOfClosedTask()],
          ['Задания в процессе', this.getNumOfInProgress()],
          ['Не начатые задания', this.getNumOfNotStarted()]
        ];
      },
      error => {
        alert("Не удалось загрузить список выданных заданий заданий");
      }
    );
  }

  insertLogin(login: string) {
    this.user.login = login;
    this.users = [];
    this.currentTasks = this.currentTasksCopy.filter(value => {return value.studentLogin.login===this.user.login});
    this.data = [
      ['Оцененные задания', this.getNumOfGradedTask()],
      ['Просроченные задания', this.getNumOfClosedTask()],
      ['Задания в процессе', this.getNumOfInProgress()],
      ['Не начатые задания', this.getNumOfNotStarted()]
    ];
  }

  findLogin() {
    this.taskService.getUserByLogin(this.user.login).subscribe(
      (users: UserApp[]) => {
        this.users = users;
        console.log(users);
      },
      error => {}
    );
  }

  getNumOfTask(): number {
    if (this.tasks.length === 0) {
      return 1;
    }
    return this.tasks.length;
  }

  getNumOfCurrentTask(): number {
    return this.currentTasks.length;
  }

  getNumOfGradedTask(): number {
    let tmp = this.currentTasks.filter(value => {return value.grade});
    return tmp.length;
  }

  getNumOfClosedTask(): number {
    let tmp = this.currentTasks.filter(value => {return !value.grade&&value.closed});
    return tmp.length;
  }

  getNumOfInProgress(): number {
    let tmp = this.currentTasks.filter(value => {return !value.grade&&!value.closed&&value.taken});
    return tmp.length;
  }

  getNumOfNotStarted(): number {
    let tmp = this.currentTasks.filter(value => {return !value.grade&&!value.closed&&!value.taken});
    return tmp.length;
  }

  getNumOfGradedTaskS(): string {
    if (this.getNumOfCurrentTask() === 0)
      return '0%'
    return Math.round(this.getNumOfGradedTask()/this.getNumOfCurrentTask()*100) + ' %' + '(' + this.getNumOfGradedTask() + ')';
  }

  getNumOfClosedTaskS(): string {
    if (this.getNumOfCurrentTask() === 0)
      return '0%'
    return Math.round(this.getNumOfClosedTask()/this.getNumOfCurrentTask()*100) + ' %' + '(' + this.getNumOfClosedTask() + ')';
  }

  getNumOfInProgressS(): string {
    if (this.getNumOfCurrentTask() === 0)
      return '0%'
    return Math.round(this.getNumOfInProgress()/this.getNumOfCurrentTask()*100) + ' %' + '(' + this.getNumOfInProgress() + ')';
  }

  getNumOfNotStartedS(): string {
    if (this.getNumOfCurrentTask() === 0)
      return '0%'
    return Math.round(this.getNumOfNotStarted()/this.getNumOfCurrentTask()*100) + ' %' + '(' + this.getNumOfNotStarted() + ')';
  }

  reset() {
    this.currentTasks = this.currentTasksCopy;
    this.user.login = '';
  }
}
