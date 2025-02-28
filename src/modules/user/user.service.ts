import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core/services/base.service';
import { FindOneOptions, Like, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { genSaltSync, hashSync } from 'bcrypt';
import { FindAllInput } from './dto/find-all.input';
import { PaginatedData } from '../../core/interfaces/pagination';

@Injectable()
export class UserService extends BaseService<User> {
  protected name = 'user';
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async create(createUserInput: CreateUserInput) {
    createUserInput.password = await hashSync(createUserInput.password, genSaltSync(10));

    return super.create(createUserInput);
  }

  findAllPaginated(options: FindAllInput): Promise<PaginatedData<User>> {
    const newOptions = {
      ...options,
      where: [
        { firstName: Like(`${options.search}%`) },
        { lastName: Like(`${options.search}%`) },
        { email: Like(`${options.search}%`) },
      ],
    };
    return super.findAllPaginated(newOptions);
  }

  findOne(options: FindOneOptions<User>) {
    return super.findOne(options);
  }

  update(id: number, updateUserInput: QueryDeepPartialEntity<User>) {
    return super.update(id, updateUserInput);
  }

  remove(id: number) {
    return super.remove(id);
  }
}
