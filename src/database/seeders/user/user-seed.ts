import { CreateUserInput } from 'src/modules/user/dto/create-user.input';

export const users: CreateUserInput[] = [
  {
    email: 'admin@test.com',
    password: 'pass1234',
    firstName: 'Admin',
    lastName: 'Test',
  },
];
