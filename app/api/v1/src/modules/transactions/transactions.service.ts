import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async createTransaction(dto: CreateTransactionDto, userId: string) {
    await this.ensureAccountAndCategoryOwnership({
      userId,
      accountId: dto.accountId,
      categoryId: dto.categoryId,
    });

    const transaction = await this.prisma.transactions.create({
      data: {
        userId,
        accountId: dto.accountId,
        categoryId: dto.categoryId,
        type: dto.type,
        amount: dto.amount,
        transactionDate: new Date(dto.transactionDate),
        note: dto.note,
      },
    });

    return {
      success: true,
      message: 'Transaction created successfully',
      data: { transaction },
    };
  }

  async getTransactions({
    userId,
    page = 1,
    limit = 10,
    type,
    accountId,
    categoryId,
  }: {
    userId: string;
    page?: number;
    limit?: number;
    type?: 'INCOME' | 'EXPENSE';
    accountId?: string;
    categoryId?: string;
  }) {
    const offset = (page - 1) * limit;
    const whereClause: {
      userId: string;
      type?: 'INCOME' | 'EXPENSE';
      accountId?: string;
      categoryId?: string;
    } = { userId };

    if (type) whereClause.type = type;
    if (accountId) whereClause.accountId = accountId;
    if (categoryId) whereClause.categoryId = categoryId;

    const transactions = await this.prisma.transactions.findMany({
      where: whereClause,
      skip: offset,
      take: limit,
      orderBy: { transactionDate: 'desc' },
      include: {
        account: true,
        category: true,
      },
    });

    return {
      success: true,
      message: 'Transactions fetched successfully',
      data: { transactions },
    };
  }

  async getTransactionById(transactionId: string, userId: string) {
    const transaction = await this.prisma.transactions.findFirst({
      where: {
        id: transactionId,
        userId,
      },
      include: {
        account: true,
        category: true,
      },
    });

    if (!transaction) throw new NotFoundException('Transaction not found');

    return {
      success: true,
      message: 'Transaction fetched successfully',
      data: { transaction },
    };
  }

  async updateTransaction({
    transactionId,
    userId,
    dto,
  }: {
    transactionId: string;
    userId: string;
    dto: UpdateTransactionDto;
  }) {
    const existingTransaction = await this.prisma.transactions.findFirst({
      where: {
        id: transactionId,
        userId,
      },
    });
    if (!existingTransaction) throw new NotFoundException('Transaction not found');

    const accountId = dto.accountId || existingTransaction.accountId;
    const categoryId = dto.categoryId || existingTransaction.categoryId;
    if (dto.accountId || dto.categoryId) {
      await this.ensureAccountAndCategoryOwnership({ userId, accountId, categoryId });
    }

    const transaction = await this.prisma.transactions.update({
      where: { id: transactionId },
      data: {
        accountId: dto.accountId,
        categoryId: dto.categoryId,
        type: dto.type,
        amount: dto.amount,
        transactionDate: dto.transactionDate
          ? new Date(dto.transactionDate)
          : undefined,
        note: dto.note,
      },
    });

    return {
      success: true,
      message: 'Transaction updated successfully',
      data: { transaction },
    };
  }

  async deleteTransaction(transactionId: string, userId: string) {
    const existingTransaction = await this.prisma.transactions.findFirst({
      where: {
        id: transactionId,
        userId,
      },
    });
    if (!existingTransaction) throw new NotFoundException('Transaction not found');

    await this.prisma.transactions.delete({
      where: { id: transactionId },
    });

    return {
      success: true,
      message: 'Transaction deleted successfully',
    };
  }

  private async ensureAccountAndCategoryOwnership({
    userId,
    accountId,
    categoryId,
  }: {
    userId: string;
    accountId: string;
    categoryId: string;
  }) {
    const [account, category] = await Promise.all([
      this.prisma.accounts.findFirst({
        where: { id: accountId, userId },
      }),
      this.prisma.category.findFirst({
        where: { id: categoryId, userId },
      }),
    ]);

    if (!account) throw new NotFoundException('Account not found');
    if (!category) throw new NotFoundException('Category not found');
  }
}
