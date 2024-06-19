import { UserRole } from 'C:/Users/polan/Documents/Git/library-webapp/src/api/dto/UserRole';

export interface RegisterDto {
  username: string;
  password: string;
  email: string;
  role: UserRole;
}

export class RegisterResponseDto {
  token: string | undefined;
}
