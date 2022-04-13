import {Group} from "./group";
import {UserApp} from "./user-app";

export class GroupRecord {
  id!: number;
  groupId!: Group;
  studentLogin!: UserApp;
}
