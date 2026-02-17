import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransferDto } from './dto/create-transfer.dto';

@Injectable()
export class TransfersService {
  constructor(private readonly prisma: PrismaService) {}

  async createTransfer({
    dto,
    userId,
  }: {
    dto: CreateTransferDto;
    userId: string;
  }) {
    return this.prisma.$transaction(async (tx) => {
      const [toAccount, fromAccount] = await Promise.all([
        tx.accounts.findUnique({
          where: {
            id: dto.toAccountId,
          },
        }),
        tx.accounts.findFirst({
          where: {
            id: dto.fromAccountId,
            userId,
          },
        }),
      ]);
      if (!toAccount || !fromAccount)
        throw new BadRequestException('Invalid account');

      if (fromAccount.balance.toNumber() < dto.amount)
        throw new BadRequestException('Insufficent funds');
      const newTransfer = await tx.transfers.create({
        data: {
          userId,
          toAccountId: dto.toAccountId,
          fromAccountId: dto.fromAccountId,
          amount: dto.amount,
          transferDate: new Date(dto.date),
        },
      });
      await tx.accounts.update({
        where: {
          id: dto.toAccountId,
        },
        data: {
          balance: {
            increment: dto.amount,
          },
        },
      });
      await tx.accounts.update({
        where: {
          id: dto.fromAccountId,
        },
        data: {
          balance: {
            decrement: dto.amount,
          },
        },
      });
      const transaction = await tx.transfers.findUnique({
        where: {
          id: newTransfer.id,
        },
        include: {
          toAccount: true,
          fromAccount: true,
        },
      });
      return {
        success: true,
        message: 'Transferred money successfully',
        data: transaction,
      };
    });
  }

  async getTransfers({
    userId,
    page = 1,
    limit = 10,
    query = '',
  }: {
    userId: string;
    page?: number;
    limit?: number;
    query?: string;
  }) {
    const offset = (page - 1) * limit;
    const where: any = { userId };
    if (query) {
      where.note = { contains: query, mode: 'insensitive' };
    }
    const transfers = await this.prisma.transfers.findMany({
      where,
      include: {
        fromAccount: true,
        toAccount: true,
      },
      take: limit,
      skip: offset,
    });
    return {
      success: true,
      message: 'Fetched transfers successfully',
      page,
      limit,
      data: {
        transfers,
      },
    };
  }

  async getTransferById(transferId: string, userId: string) {
    const transfer = await this.prisma.transfers.findFirst({
      where: {
        id: transferId,
        userId,
      },
      include: {
        toAccount: true,
        fromAccount: true,
      },
    });
    return {
      success: true,
      message: 'Fetched Transfer successfully',
      data: transfer,
    };
  }
}
