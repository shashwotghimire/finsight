import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountType, Currency } from 'src/generated/prisma/enums';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);

  constructor(private readonly prisma: PrismaService) {}

  async addAccount(dto: CreateAccountDto, userId: string) {
    this.logger.log(`Creating account for userId: ${userId}`);
    const account = await this.prisma.accounts.create({
      data: {
        name: dto.name,
        userId,
        type: dto.accountType || AccountType.PERSONAL,
        currency: dto.currency || Currency.NPR,
        balance: dto.balance,
      },
    });
    return {
      success: true,
      message: 'Account added successfully',
      data: { account },
    };
  }

  async getAllAccounts({
    userId,
    page = 1,
    limit = 10,
    search = '',
    type,
  }: {
    userId: string;
    page?: number;
    limit?: number;
    search?: string;
    type?: 'PERSONAL' | 'JOINT' | 'SAVING';
  }) {
    this.logger.log(`Fetching all accounts for userId: ${userId}`);
    const offset = (page - 1) * limit;
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    const whereClause: {
      userId: string;
      name?: { contains: string; mode: 'insensitive' };
      type?: AccountType;
    } = { userId };
    if (search) {
      whereClause.name = { contains: search, mode: 'insensitive' };
    }
    if (type) {
      whereClause.type = type;
    }
    const accounts = await this.prisma.accounts.findMany({
      where: whereClause,
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    });
    const total = await this.prisma.accounts.count({ where: whereClause });
    return {
      success: true,
      message: "User's accounts fetched successfully",
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      total,
      data: {
        accounts,
      },
    };
  }

  async getAccountById(accountId: string, userId: string) {
    this.logger.log(`Fetching account ${accountId} for userId: ${userId}`);
    const account = await this.prisma.accounts.findFirst({
      where: { id: accountId, userId },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            name: true,
            profilePicUrl: true,
            type: true,
          },
        },
        name: true,
        type: true,
        currency: true,
        balance: true,
        createdAt: true,
        updatedAt: true,
        transactions: true,
        outgoingTransfers: true,
        incomingTransfers: true,
      },
    });
    if (!account) throw new NotFoundException('Account not found');

    return {
      success: true,
      message: 'Fetched account successfully',
      data: {
        account,
      },
    };
  }

  async updateAccount({
    accountId,
    userId,
    dto,
  }: {
    accountId: string;
    userId: string;
    dto: UpdateAccountDto;
  }) {
    this.logger.log(`Updating account ${accountId}`);
    const account = await this.prisma.accounts.findFirst({
      where: { id: accountId, userId },
    });
    if (!account) throw new NotFoundException('Account not found');
    const updatedAccount = await this.prisma.accounts.update({
      where: { id: accountId },
      data: {
        name: dto.name,
        type: dto.accountType,
        balance: dto.balance,
        currency: dto.currency,
      },
    });

    return {
      success: true,
      message: 'Account updated successfully',
      data: {
        account: updatedAccount,
      },
    };
  }

  async deleteAccount(accountId: string, userId: string) {
    this.logger.log(`Deleting account ${accountId}`);
    const account = await this.prisma.accounts.findFirst({
      where: { id: accountId, userId },
    });
    if (!account) throw new NotFoundException('Account not found');
    await this.prisma.accounts.delete({ where: { id: accountId } });
    return {
      success: true,
      message: 'Account deleted successfully',
    };
  }
}
