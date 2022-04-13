import { Component, OnInit } from '@angular/core';
import {Group} from "../tasks/group";
import {GroupService} from "../tasks/group.service";
import {GroupRecord} from "../tasks/group-record";
import {UserApp} from "../tasks/user-app";
import {TaskService} from "../tasks/task.service";
import {UserService} from "../user.service";
import {CurrentTask} from "../tasks/current-task";
import {Task} from "../tasks/task";
import {CurrentTaskService} from "../tasks/current-task.service";
import {ServerDateService} from "../tasks/server-date.service";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  newGroup: Group = new Group();
  newGroupRecord: GroupRecord = new GroupRecord;
  groups: Group[] = [];
  users: UserApp[] = [];
  role: string = '';
  emit: boolean = false;
  newCurrentTask: CurrentTask = new CurrentTask();
  currentTime: Date = new Date();
  constructor(private groupService: GroupService,
              private taskService: TaskService,
              private userService: UserService,
              private currentTaskService: CurrentTaskService,
              private serverDateService: ServerDateService) { }

  ngOnInit(): void {
    this.getDate()
    this.getRole();
    this.getGroups();
    this.newGroupRecord.studentLogin = new UserApp();
    this.newCurrentTask.taskId = new Task();
  }

  timeToView(time: Date): String {
    if (time != null)
      return time.toString().slice(11, 19) + ' ' + time.toString().slice(8, 10) + '-' + time.toString().slice(5, 7) + '-' + time.toString().slice(0, 4);
    else
      return "ff";
  }

  setEmit() {
    this.emit = ! this.emit;
  }

  getRole() {
    this.userService.role().subscribe(value => {
        console.log(value);
        this.role = value.role;
      },
      error => {
        console.log(error);
      });
  }

  getGroups() {
    this.groupService.getGroups().subscribe(value => {
      this.groups = value;
    }, error => {
      alert('Не удалось загрузить список групп');
    });
  }

  findLogin() {
    this.taskService.getUserByLogin(this.newGroupRecord.studentLogin.login).subscribe(
      (users: UserApp[]) => {
        this.users = users;
        console.log(users);
      },
      error => {}
    );
  }

  insertLogin(login: string) {
    this.newGroupRecord.studentLogin.login = login;
    this.users = [];
  }


  addGroupRecord(group: Group) {
    this.newGroupRecord.groupId = group;
    this.groupService.addGroupMember(this.newGroupRecord).subscribe(value => {
      this.getGroups();
    }, error => {
      alert('Не удалось');
    });
  }

  deleteLastGroupRecord(group: Group) {
    let tmp = group.groupRecords.pop();
    if(tmp !== undefined) {
      this.groupService.deleteGroupMember(tmp).subscribe(value => {
        this.getGroups();
      })
    }
  }


  deleteGroup(group: Group) {
    this.groupService.deleteGroup(group).subscribe(value => {
      this.getGroups();
    });
  }

  createGroup() {
    this.groupService.addGroup(this.newGroup).subscribe(value => {
      this.getGroups();
    });
  }

  emitTask(group: Group) {
    let tmp = group;
    let tmpCT = this.newCurrentTask;
    tmp.groupRecords.forEach(value => {
      this.newCurrentTask.studentLogin = value.studentLogin;
      this.currentTaskService.addTask(tmpCT).subscribe(value1 => {
      }, error => {
        alert('Не удалось');
      });
    });
    this.getGroups();
  }

  getDate() {
    this.serverDateService.getDate().subscribe(value => {
      this.currentTime = value;
    });
  }
}
