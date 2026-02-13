import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '../auth/common/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from '../auth/common/interface/authenticatedRequest';

@UseGuards(AuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @Get('stats')
  async getDashboardStats(@Req() req: AuthenticatedRequest) {
    return await this.dashboardService.getDashboardStats(req.user.id);
  }
}
