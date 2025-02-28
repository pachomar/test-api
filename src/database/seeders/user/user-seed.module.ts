import { Module } from '@nestjs/common';
import { EmailService } from 'src/config/email/email.service';
import { UserModule } from 'src/modules/user/user.module';
import { UserSeedService } from './user-seed.service';

@Module({
  imports: [UserModule],
  providers: [UserSeedService, EmailService],
  exports: [UserSeedService, UserModule],
})
export class UserSeedModule {}
