import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

/*
 * https://docs.nestjs.com/graphql/quick-start#schema-first
 */

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./src/**/*.graphql', './src/modules/**/*.graphql'],
  path: join(process.cwd(), './src/config/graphql/graphql.schema.ts'),
  outputAs: 'class',
  watch: true,
});
