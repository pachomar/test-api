import { PartialType } from '@nestjs/mapped-types';
import { GraphPagingInput } from '../../../core/interfaces/pagination';

export class FindAllInput extends PartialType(GraphPagingInput) {}
