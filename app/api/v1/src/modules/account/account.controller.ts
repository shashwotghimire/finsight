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
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import type { AuthenticatedRequest } from '../auth/common/interface/authenticatedRequest';
import { AuthGuard } from '../auth/common/guards/jwt-auth.guard';
import { UpdateAccountDto } from './dto/update-account.dto';

@UseGuards(AuthGuard)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async addAccount(
    @Body() dto: CreateAccountDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.accountService.addAccount(dto, req.user.id);
  }

  @Get()
  async getAccounts(
    @Req() req: AuthenticatedRequest,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('query') query?: string,
    @Query('type') type?: 'JOINT' | 'PERSONAL' | 'SAVING',
  ) {
    return await this.accountService.getAllAccounts({
      userId: req.user.id,
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined,
      query,
      type,
    });
  }

  @Get(':accountId')
  async getAccountById(
    @Param('accountId') accountId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.accountService.getAccountById(accountId, req.user.id);
  }

  @Patch(':accountId')
  async updateAccount(
    @Param('accountId') accountId: string,
    @Body() dto: UpdateAccountDto,
  ) {
    return await this.accountService.updateAccount({
      accountId,
      dto,
    });
  }

  @Delete(':accountId')
  async deleteAccount(@Param('accountId') accountId: string) {
    return await this.accountService.deleteAccount(accountId);
  }
}
