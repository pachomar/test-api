import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppRoles } from 'src/config/roles';
import { User } from './../../modules/user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  private logger = new Logger('RolesGuard');
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<AppRoles[]>('roles', [context.getHandler(), context.getClass()]);
    const handlerName = context.getHandler().name;
    if (!roles || !roles.length) {
      return true;
    }

    const { user }: { user: User } = context.switchToHttp().getRequest();
    return this.validate(user, roles, handlerName);
  }

  private async validate(user: User, roles: AppRoles[], handlerName: string) {
    if (!user) {
      throw new UnauthorizedException('Unathorized request');
    }

    console.log(roles);

    /* INCLUDE LOGIC FOR ROLE VALIDATION */

    if (false) {
      this.logger.error(`User ${user.id} was rejected access to perfom ${handlerName} due to unsifficient permissions`);
      throw new ForbiddenException('You do not have permission to perform this operation');
    }

    return true;
  }
}
