import { UserRole } from 'C:/Users/polan/Documents/Git/library-webapp/src/api/dto/UserRole';

export class RegisterDto {
  password: string | undefined;
  username: string | undefined;
  role: UserRole | undefined;
  email: string | undefined;
}

export class RegisterResponseDto {
  token: string | undefined;
}
