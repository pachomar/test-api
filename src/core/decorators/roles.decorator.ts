import { SetMetadata } from '@nestjs/common';
import { AppRoles } from 'src/config/roles';

export const Roles = (...args: AppRoles[]) => SetMetadata('roles', args);
