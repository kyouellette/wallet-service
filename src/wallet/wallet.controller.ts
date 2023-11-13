import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Wallet } from './entities/wallet.entity';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { GetTransactionDTO } from './dto/get-transaction.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('/create')
  create(@Body() { userId }: { userId: string }): Promise<Wallet> {
    return this.walletService.createWallet(userId);
  }

  @Get('/:userId')
  getBalance(@Param() { userId }: { userId: string }): Promise<Wallet> {
    return this.walletService.getWallet(userId);
  }

  @Get('/transactions/user')
  getTransactions(@Body() data: GetTransactionDTO): Promise<Transaction[]> {
    return this.walletService.getTransactions(data);
  }

  @Post('/transaction/create')
  createTransaction(@Body() data: CreateTransactionDTO): Promise<Transaction> {
    return this.walletService.createTransaction(data);
  }
}
