import { User } from 'src/modules/user/entities/user.entity';

export interface TokenPayload {
  email: string;
  firstname: string;
  lastname: string;
  // role: string;
  id: number;
}

export interface LoginResponse {
  access_token: string;
  user: User;
  refresh_token: string;
}
