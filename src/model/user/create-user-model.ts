import { ICreateUser, UserRole } from "../../interface/user/create-user-interface";

export class CreateUserModel {
  name: string;
  email: string;
  password: string;
  role?: UserRole;

  constructor(data: ICreateUser) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role ?? "BARBEIRO"; 
  }

  toPayload(): ICreateUser {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
    };
  }
}