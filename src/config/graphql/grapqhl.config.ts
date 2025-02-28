import { ConfigService } from '@nestjs/config';
import { GqlModuleAsyncOptions, GqlModuleOptions } from '@nestjs/graphql';
import { join } from 'path';
import { ProductIntervalResolver } from 'src/common/resolvers/productInterval.resolver';
import { AppConfiguration, AppEnvironment } from '../configuration.interface';

export default class GraphQLConfig {
  static getGraphQLConfig(config: ConfigService): GqlModuleOptions {
    const appConfig = config.get<AppConfiguration>('app');
    return {
      debug: appConfig.env === AppEnvironment.Development,
      typePaths: ['./**/*.graphql'],
      // for context, see https://github.com/nestjs/graphql/issues/48#issuecomment-420693225
      context: ({ req }) => ({ req }),
      definitions: {
        path: join(process.cwd(), 'src/config/graphql/graphql.schema.ts'),
      },
      resolvers: {
        ProductIntervalType: ProductIntervalResolver,
      },
    };
  }
}

export const graphQLAsyncConfig: GqlModuleAsyncOptions = {
  useFactory: async (config: ConfigService) => GraphQLConfig.getGraphQLConfig(config),
  inject: [ConfigService],
};
