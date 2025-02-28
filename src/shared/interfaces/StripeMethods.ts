export interface createSubscription {
  customer: string;
  price: string;
  default_payment_method: string;
  trial_period_days?: number;
}
