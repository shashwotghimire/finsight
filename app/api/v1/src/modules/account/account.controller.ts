import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
  private readonly logger = new Logger(AccountController.name);

  constructor(private readonly accountService: AccountService) {}

  @Post()
  async addAccount(
    @Body() dto: CreateAccountDto,
    @Req() req: AuthenticatedRequest,
  ) {
    this.logger.log(`POST /account - userId: ${req.user.id}`);
    return await this.accountService.addAccount(dto, req.user.id);
  }

  @Get()
  async getAccounts(
    @Req() req: AuthenticatedRequest,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('type') type?: 'JOINT' | 'PERSONAL' | 'SAVING',
  ) {
    this.logger.log(
      `GET /account - userId: ${req.user.id}, page: ${page}, limit: ${limit}, search: ${search}, type: ${type}`,
    );
    return await this.accountService.getAllAccounts({
      userId: req.user.id,
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined,
      search,
      type,
    });
  }

  @Get(':accountId')
  async getAccountById(
    @Param('accountId') accountId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    this.logger.log(`GET /account/${accountId} - userId: ${req.user.id}`);
    return await this.accountService.getAccountById(accountId, req.user.id);
  }

  @Patch(':accountId')
  async updateAccount(
    @Param('accountId') accountId: string,
    @Body() dto: UpdateAccountDto,
    @Req() req: AuthenticatedRequest,
  ) {
    this.logger.log(`PATCH /account/${accountId} - userId: ${req.user.id}`);
    return await this.accountService.updateAccount({
      accountId,
      userId: req.user.id,
      dto,
    });
  }

  @Delete(':accountId')
  async deleteAccount(
    @Param('accountId') accountId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    this.logger.log(`DELETE /account/${accountId} - userId: ${req.user.id}`);
    return await this.accountService.deleteAccount(accountId, req.user.id);
  }
}
