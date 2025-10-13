import { ICreateUser } from "../../interface/user/create-user-interface";

export class CreateUserModel {
  name: string;
  email: string;
  password: string;

  constructor(data: ICreateUser) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }

  toPayload(): ICreateUser {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
    };
  }
}