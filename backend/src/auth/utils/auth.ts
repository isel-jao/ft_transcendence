import { User } from "@prisma/client";
import { CreateUserDto } from "../../user/entities";
export interface AuthenticationProvider {
  validateUser(id: number, data: CreateUserDto);
  createUser(data: CreateUserDto);
  findUser(id: number): Promise<User | undefined>;
}
