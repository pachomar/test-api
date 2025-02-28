import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppRoles } from 'src/config/roles';
import { Roles } from 'src/core/decorators/roles.decorator';
import { GraphqlAuthGuard } from 'src/core/guards/graphql-auth.guard';
import { GraphqlRolesGuard } from 'src/core/guards/graphql-roles.guard';
import { FindOneOptions } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { FindAllInput } from './dto/find-all.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GraphqlAuthGuard, GraphqlRolesGuard)
  @Mutation('createUser')
  @Roles(AppRoles.SuperAdmin, AppRoles.Admin)
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query('users')
  findAll(@Args('input') options: FindAllInput) {
    return this.userService.findAllPaginated(options);
  }

  @Query('user')
  findOne(@Args('input') options: FindOneOptions) {
    return this.userService.findOne(options);
  }

  @Mutation('updateUser')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation('removeUser')
  remove(@Args('id') id: number) {
    return this.userService.remove(id);
  }
}
