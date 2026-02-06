import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async create() {
    console.log('route hit');
    return await this.authService.create();
  }
}
