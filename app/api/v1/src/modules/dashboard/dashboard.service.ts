import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}
  async getDashboardStats(userId: string) {
    const [
      totalAccounts,
      totalBalance,
      totalIncome,
      totalExpense,
      savingsRate,
    ] = await Promise.all([
      // await this.prisma.accounts.count({
      //   where: {
      //     userId,
      //   },
      // }),
      '100(test)',
      '100(test)',
      '100(test)',
      '100(test)',
      '100(test)',
    ]);
    return {
      success: true,
      message: 'Successfully fetched dashboard stats',
      data: {
        totalAccounts,
        totalBalance,
        totalIncome,
        totalExpense,
        savingsRate,
      },
    };
  }
}
