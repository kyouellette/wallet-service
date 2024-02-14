import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { Transaction } from './entities/transaction.entity';
import { TransactionType } from './enum/transaction-type.enum';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { GetTransactionDTO } from './dto/get-transaction.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async createWallet(userId: string): Promise<Wallet> {
    console.log(userId);
    return await this.walletRepository.save({
      userId,
      balance: '0.00',
      Transactions: [],
    });
  }

  async getWallet(userId: string): Promise<Wallet> {
    return await this.walletRepository.findOne({
      where: {
        userId: userId,
      },
    });
  }

  async getTransactions(data: GetTransactionDTO): Promise<Transaction[]> {
    const { userId, type } = data;
    const where = type
      ? {
          userId,
          type,
        }
      : {
          userId,
        };
    return await this.transactionRepository.find({ where: where });
  }

  async createTransaction(data: CreateTransactionDTO): Promise<Transaction> {
    const { userId, amount, type } = data;
    // Retrieve the user's wallet
    const wallet = await this.getWallet(userId);

    if (!wallet) {
      throw new Error('Wallet not found for the user.');
    }

    // Convert the string amount to a number with 2 decimal places
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      throw new Error('Invalid amount.');
    }

    const roundedAmount = parseFloat(numericAmount.toFixed(2)); // Ensure 2 decimal places

    // Create a new transaction
    const transaction = this.transactionRepository.create({
      userId,
      amount,
      type,
    });

    // Update the wallet balance based on the transaction type
    if (type === TransactionType.ADD) {
      wallet.balance = (parseFloat(wallet.balance) + roundedAmount)
        .toFixed(2)
        .toString();
    } else if (
      type === TransactionType.REMOVE ||
      type === TransactionType.SPEND
    ) {
      if (parseFloat(wallet.balance) >= roundedAmount) {
        wallet.balance = (parseFloat(wallet.balance) - roundedAmount)
          .toFixed(2)
          .toString();
      } else {
        throw new Error('Insufficient Balance');
      }
    }

    // Save the transaction and update the wallet balance
    await this.transactionRepository.save(transaction);
    await this.walletRepository.save(wallet);

    // Return the updated wallet
    return transaction;
  }
}
