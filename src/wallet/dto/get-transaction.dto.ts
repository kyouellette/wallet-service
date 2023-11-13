import { TransactionType } from '../enum/transaction-type.enum';

export class GetTransactionDTO {
  userId: string;

  type?: TransactionType;
}
