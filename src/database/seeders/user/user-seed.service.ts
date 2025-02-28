import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { users } from './user-seed';

@Injectable()
export class UserSeedService {
  constructor(private readonly userService: UserService) {}

  create() {
    return users.map(async (user) => {
      const exists = await this.userService.findOne({ where: { email: user.email } });
      if (exists) {
        return;
      }

      return await this.userService.create(user);
    });
  }
}
