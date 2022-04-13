export class LoginReqest {
  private username: string;
  private password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }


  getusername(): string {
    return this.username;
  }

  setusername(value: string) {
    this.username = value;
  }

  getpassword(): string {
    return this.password;
  }

  setpassword(value: string) {
    this.password = value;
  }
}
