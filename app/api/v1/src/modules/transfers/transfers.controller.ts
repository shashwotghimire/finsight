import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import type { AuthenticatedRequest } from '../auth/common/interface/authenticatedRequest';
import { AuthGuard } from '../auth/common/guards/jwt-auth.guard';

@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}
  @UseGuards(AuthGuard)
  @Post('')
  async createTransfer(
    @Body() dto: CreateTransferDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.id;
    return await this.transfersService.createTransfer({ dto, userId });
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAccounts(
    @Req() req: AuthenticatedRequest,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('query') query?: string,
  ) {
    return await this.transfersService.getTransfers({
      userId: req.user.id,
      page,
      limit,
      query,
    });
  }

  @UseGuards(AuthGuard)
  @Get(':transferId')
  async getTransferById(
    @Param('transferId') transferId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.transfersService.getTransferById(transferId, req.user.id);
  }
}
