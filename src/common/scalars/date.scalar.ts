import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date')
export class DateScalar implements CustomScalar<string | Date, Date> {
  description = 'Date scalar type';

  parseValue(value: any): Date {
    return new Date(value);
  }
  serialize(value: string): Date {
    return new Date(value);
  }

  parseLiteral(ast: ValueNode): Date {
    console.log(ast);
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}
