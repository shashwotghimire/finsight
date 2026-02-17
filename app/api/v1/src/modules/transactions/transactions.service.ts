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

    return this.prisma.$transaction(async (tx) => {
      const account = await tx.accounts.findUnique({
        where: {
          id: dto.accountId,
        },
      });
      if (!account) throw new NotFoundException('Account not found');
      const transaction = await tx.transactions.create({
        data: {
          userId,
          accountId: dto.accountId,
          amount: dto.amount,
          categoryId: dto.categoryId,
          subCategoryId: dto.subCategoryId || null,
          type: dto.type,
          transactionDate: new Date(dto.transactionDate),
          note: dto.note,
        },
      });
      const balanceChange =
        transaction.type === 'INCOME'
          ? transaction.amount
          : transaction.amount.neg();

      await tx.accounts.update({
        where: {
          id: dto.accountId,
        },
        data: {
          balance: {
            increment: balanceChange,
          },
        },
      });
      const newTransaction = await tx.transactions.findUnique({
        where: {
          id: transaction.id,
        },
        include: {
          account: true,
        },
      });
      return {
        success: true,
        message: 'Transaction created successfully',
        data: newTransaction,
      };
    });
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
        subcategory: true,
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
        subcategory: true,
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
    return this.prisma.$transaction(async (tx) => {
      const transaction = await tx.transactions.findUnique({
        where: {
          id: transactionId,
        },
      });
      if (!transaction) throw new NotFoundException('Transaction not found');
      const account = await tx.accounts.findFirst({
        where: {
          id: dto.accountId,
          userId,
        },
      });
      if (!account) throw new NotFoundException('Account not found');
      const oldBalanceChange =
        transaction.type === 'INCOME'
          ? transaction.amount.neg()
          : transaction.amount;

      await tx.accounts.update({
        where: {
          id: transaction.accountId,
        },
        data: {
          balance: {
            increment: oldBalanceChange,
          },
        },
      });

      const updated = await tx.transactions.update({
        where: {
          id: transactionId,
        },
        data: {
          accountId: dto.accountId,
          amount: dto.amount,
          type: dto.type,
          categoryId: dto.categoryId,
          subCategoryId: dto.subCategoryId,
          note: dto.note,
        },
      });
      const balanceChange =
        updated.type === 'INCOME' ? updated.amount : updated.amount.neg();

      await tx.accounts.update({
        where: {
          id: dto.accountId,
          userId,
        },
        data: {
          balance: {
            increment: balanceChange,
          },
        },
      });
      const updatedTransacttion = await tx.transactions.findFirst({
        where: {
          id: transactionId,
          userId,
        },
        include: {
          account: true,
        },
      });
      return {
        success: true,
        message: 'Transaction updated successfully',
        data: updatedTransacttion,
      };
    });
  }

  async deleteTransaction(transactionId: string, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      const transaction = await tx.transactions.findFirst({
        where: {
          id: transactionId,
          userId,
        },
      });
      if (!transaction) throw new NotFoundException('Transaction not found');
      const account = await tx.accounts.findFirst({
        where: {
          id: transaction.accountId,
          userId,
        },
      });
      if (!account) throw new NotFoundException('Account not found');
      const balanceChange =
        transaction.type === 'INCOME'
          ? transaction.amount.neg()
          : transaction.amount;

      await tx.accounts.update({
        where: {
          id: transaction.accountId,
        },
        data: {
          balance: {
            increment: balanceChange,
          },
        },
      });

      await tx.transactions.delete({
        where: {
          id: transactionId,
        },
      });
      return {
        success: true,
        message: 'Transaction deleted successfully',
      };
    });
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
