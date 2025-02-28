// import { Module } from '@nestjs/common';
// import { GraphQLModule } from '@nestjs/graphql';
// import { MongooseModule } from '@nestjs/mongoose';
// import { mongoAsyncConfig } from './../config/database/mongo/mongo.config';
// // import { mysqlTypeOrmConfigAsync } from './../config/database/mysql/mysql.config';

// @Module({
//   imports: [
//     /*
//      * HERE YOU CAN SET UP DATABASE ENGINE/S.
//      *
//      * You can choose among any of the available Nest.js database connectors
//      * https://docs.nestjs.com/techniques/database
//      *
//      * Mongoose is set as default here.
//      * You can use it as it is, replace or tweak it, add more database connections...
//      */
//     MongooseModule.forRootAsync(mongoAsyncConfig),
//     /*
//      * TypeOrmModule.forRootAsync(mysqlTypeOrmConfigAsync)
//      */

//     /*
//      * GRAPHQL SETTINGS
//      */
//     GraphQLModule.forRoot({
//       debug: false,
//       typePaths: ['./**/*.graphql'],
//       context: ({ req }) => ({ req }),
//     }),
//   ],
// })
// export class CoreModule {}
