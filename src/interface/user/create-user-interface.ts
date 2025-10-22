export type UserRole = "ADMIN" | "BARBEIRO";

export interface ICreateUser {
  name: string;  
  email: string;
  password: string;
  role?: UserRole; 
}