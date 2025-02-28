import { ConfigModule } from '@nestjs/config';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlTypeOrmConfigAsync } from 'src/config/database/mysql/mysql.config';
import { Seeder } from './seeder';
import { UserSeedModule } from './user/user-seed.module';
import configuration from 'src/config/configuration';
import { validationSchema } from 'src/config/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
      validationSchema: validationSchema,
    }),
    TypeOrmModule.forRootAsync(mysqlTypeOrmConfigAsync),
    UserSeedModule,
  ],
  providers: [Seeder, Logger],
})
export class SeederModule {}
