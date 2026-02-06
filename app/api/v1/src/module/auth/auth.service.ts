import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async create() {
    const user = await this.prisma.user.create({
      data: {
        name: 'xd',
      },
    });
    return user;
  }
}
