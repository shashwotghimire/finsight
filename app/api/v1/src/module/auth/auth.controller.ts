import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
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
  @Get('me')
  async getMe() {
    return await this.authService.getLoggedInUser('cmlb3ox4c0000imslyhj4lkeu');
  }
}
