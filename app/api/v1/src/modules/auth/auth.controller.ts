import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { AuthGuard } from './common/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from './common/interface/authenticatedRequest';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { RolesGuard } from './common/guards/roles.guard';
import { Roles, ROLES_KEY } from './common/decorators/roles.decorator';
import { UserType } from 'src/generated/prisma/enums';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cloudinary: CloudinaryService,
  ) {}
  @Post('register')
  async registerUser(@Body() dto: RegisterUserDto) {
    console.log('route hit');
    return await this.authService.registerUser(dto);
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserType.FREE)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
      fileFilter(req, file, cb) {
        if (!file.mimetype.startsWith('image/')) {
          return cb(new BadRequestException('Only images allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadFile(
    @Req() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = await this.cloudinary.uploadFile(file);
    return await this.authService.uploadProfilePic(
      result.secure_url,
      req.user.id,
    );
  }
  @Post('login')
  async loginUser(@Body() dto: LoginUserDto) {
    return await this.authService.loginUser(dto);
  }
  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@Req() req: AuthenticatedRequest) {
    return await this.authService.getLoggedInUser(req.user.id);
  }
}
