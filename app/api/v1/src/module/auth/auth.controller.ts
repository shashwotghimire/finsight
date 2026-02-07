import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { AuthGuard } from './common/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from './common/interface/authenticatedRequest';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async registerUser(@Body() dto: RegisterUserDto) {
    console.log('route hit');
    return await this.authService.registerUser(dto);
  }
  @Post('login')
  async loginUser(@Body() dto: LoginUserDto) {
    return await this.authService.loginUser(dto);
  }
  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@Req() req: AuthenticatedRequest) {
    return await this.authService.getLoggedInUser('cmlb5h6vy0000qcsls4vrq38j');
  }
}
