import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class SortingArgs {
  @Field()
  @IsString()
  @IsOptional()
  field: string;

  @Field()
  @IsString()
  @IsOptional()
  direction: 'ASC' | 'DESC';
}
