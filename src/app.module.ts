import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { mysqlTypeOrmConfigAsync } from './config/database/mysql/mysql.config';
import { graphQLAsyncConfig } from './config/graphql/grapqhl.config';
import { validationSchema } from './config/validation';
import { SeederModule } from './database/seeders/seeder.module';
import { UserModule } from './modules/user/user.module';
import { AppController } from './app/app.controller';
import { EmailModule } from './config/email/email.module';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
      validationSchema: validationSchema,
    }),
    /*
     * HERE YOU CAN SET UP DATABASE ENGINE/S.
     */
    TypeOrmModule.forRootAsync(mysqlTypeOrmConfigAsync),
    /*
     * GRAPHQL SETTINGS
     */
    GraphQLModule.forRootAsync({ driver: ApolloDriver, ...graphQLAsyncConfig }),
    AppModule,
    EmailModule,
    AuthModule,
    UserModule,
    SeederModule,
  ],
  providers: [AppService, Logger],
  controllers: [AppController],
})
export class AppModule {}
