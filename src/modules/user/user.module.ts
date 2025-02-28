// import { UserSchema } from './../../shared/users/entity/user.schema';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entities/user.entity';
import { EmailModule } from 'src/config/email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EmailModule],
  providers: [UserResolver, UserService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
