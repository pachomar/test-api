import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AppRoles } from 'src/config/roles';
import { User } from '../../modules/user/entities/user.entity';

@Injectable()
export class GraphqlRolesGuard implements CanActivate {
  private logger = new Logger('GraphqlRolesGuard');
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const handlerName = context.getHandler().name;
    const roles = this.reflector.getAllAndOverride<AppRoles[]>('roles', [ctx.getHandler(), ctx.getClass()]);
    if (!roles) {
      return true;
    }

    const { user }: { user: User } = ctx.getContext().req;

    return this.validate(user, roles, handlerName);
  }

  private async validate(user: User, roles: AppRoles[], handlerName: string) {
    if (!user) {
      throw new UnauthorizedException('Unathorized graphql request');
    }

    /* INCLUDE LOGIC TO EVALUATE ROLES */
    // this.logger.log(roles);
    if (false) {
      this.logger.error(`User ${user.id} was rejected access to perfom ${handlerName} due to unsifficient permissions`);
    }

    return true;
  }
}
