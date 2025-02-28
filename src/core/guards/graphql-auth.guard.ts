import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GraphqlAuthGuard extends AuthGuard('jwt') {
  private logger = new Logger('GraphqlAuthGuard');
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    return super.canActivate(new ExecutionContextHost([req]));
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      this.logger.error({ message: 'Unathorized graphql request', user, err });
      throw err || new UnauthorizedException('Unathorized graphql request');
    }
    return user;
  }
}
