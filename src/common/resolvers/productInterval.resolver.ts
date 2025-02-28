import { ProductIntervalType } from 'src/config/graphql/graphql.schema';

export const ProductIntervalResolver: Record<keyof typeof ProductIntervalType, string> = {
  YEAR: 'year',
  MONTH: 'month',
  WEEK: 'week',
  DAY: 'day',
};
