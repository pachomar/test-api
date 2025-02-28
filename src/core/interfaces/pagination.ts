import { IsInt, IsOptional, IsString } from 'class-validator';

export interface PagingMeta {
  count: number;
  hasNextPage: boolean;
}

export interface PaginatedData<T> {
  pagingMeta: PagingMeta;
  data: T[];
}

export class GraphPagingInput {
  @IsOptional()
  @IsInt()
  skip: number;

  @IsOptional()
  @IsInt()
  take: number;

  @IsOptional()
  @IsString()
  search: string;
}
