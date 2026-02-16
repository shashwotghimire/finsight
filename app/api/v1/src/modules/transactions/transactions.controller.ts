import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from '../auth/common/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from '../auth/common/interface/authenticatedRequest';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async createTransaction(
    @Body() dto: CreateTransactionDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.transactionsService.createTransaction(dto, req.user.id);
  }

  @Get()
  async getTransactions(
    @Req() req: AuthenticatedRequest,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('type') type?: 'INCOME' | 'EXPENSE',
    @Query('accountId') accountId?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    return await this.transactionsService.getTransactions({
      userId: req.user.id,
      page,
      limit,
      type,
      accountId,
      categoryId,
    });
  }

  @Get(':transactionId')
  async getTransactionById(
    @Param('transactionId') transactionId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.transactionsService.getTransactionById(
      transactionId,
      req.user.id,
    );
  }

  @Patch(':transactionId')
  async updateTransaction(
    @Param('transactionId') transactionId: string,
    @Body() dto: UpdateTransactionDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.transactionsService.updateTransaction({
      transactionId,
      userId: req.user.id,
      dto,
    });
  }

  @Delete(':transactionId')
  async deleteTransaction(
    @Param('transactionId') transactionId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.transactionsService.deleteTransaction(
      transactionId,
      req.user.id,
    );
  }
}
