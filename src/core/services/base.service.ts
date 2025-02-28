import { Logger, NotFoundException } from '@nestjs/common';
import { BaseEntity, DeleteResult, FindManyOptions, FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { PaginatedData } from '../interfaces/pagination';

export abstract class BaseService<T extends BaseEntity> {
  protected abstract name: string;
  protected logger: Logger;
  constructor(private readonly genericRepository: Repository<T>) {
    this.init();
  }

  private init() {
    this.logger = new Logger(this.name);
  }

  public async create(createInput: any): Promise<T> {
    try {
      this.logger.log({ message: 'Operation create', createInput });
      const model = await this.genericRepository.save(createInput);
      return model;
    } catch (err) {
      this.logger.error(`ERROR: operation create`);
      this.logger.error(err);
    }
  }

  public async findAll(filters: FindManyOptions<T> = {}): Promise<[T[], number]> {
    try {
      return await this.genericRepository.findAndCount(filters);
    } catch (err) {
      this.logger.error({ message: 'ERROR: operation findAll', filters });
      this.logger.error(err);
    }
  }
  public async findAllPaginated(filters: FindManyOptions<T> = {}): Promise<PaginatedData<T>> {
    try {
      const response = await this.genericRepository.findAndCount(filters);
      return { data: response[0], pagingMeta: { count: response[1], hasNextPage: true } };
    } catch (err) {
      this.logger.error({ message: 'ERROR: operation findAll', filters });
      this.logger.error(err);
    }
  }

  public async findOne(options: FindOneOptions<T> = {}): Promise<T> {
    try {
      return await this.genericRepository.findOne(options);
    } catch (err) {
      this.logger.error({ message: 'ERROR: operation findOne', options });
      this.logger.error(err);
    }
  }

  public async update(id: number, updateInput: QueryDeepPartialEntity<T>): Promise<UpdateResult> {
    try {
      return await this.genericRepository.update(id, updateInput);
    } catch (err) {
      this.logger.error({ message: 'ERROR: operation findOne', id, updateInput });
      this.logger.error(err);
    }
  }

  public async remove(id: number): Promise<DeleteResult> {
    const model = await this.genericRepository.findOne({ where: { id } as any });

    if (!model) {
      this.logger.error(`Attempt to delete not existant model with id ${id}`);
      throw new NotFoundException(`No ${this.name} with id ${id} was found.`);
    }

    try {
      return await this.genericRepository.delete(id);
    } catch (err) {
      this.logger.error(`ERROR: operation remove model with id ${id}`);
      this.logger.error(err);
    }
  }
}
