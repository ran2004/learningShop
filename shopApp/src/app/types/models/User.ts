import { Role } from "../enums/Role";

export interface User {
  id: number;
  name: string;
  isActive?: boolean;
  role:Role
}
