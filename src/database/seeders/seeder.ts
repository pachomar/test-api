import { Injectable, Logger } from '@nestjs/common';
import { UserSeedService } from './user/user-seed.service';

@Injectable()
export class Seeder {
  constructor(private readonly logger: Logger, private readonly userSeeder: UserSeedService) {}

  async seed() {
    try {
      this.logger.log('Running seed...');
      await this.users();
    } catch (err) {
      this.logger.error(err);
    }
  }

  private async users() {
    try {
      this.logger.log('Seeding users...');
      const users = await Promise.all(this.userSeeder.create());
      this.logger.log(`${users.length} users created`);
    } catch (error) {
      this.logger.error('Error while seeding users', error);
    }
  }
}
