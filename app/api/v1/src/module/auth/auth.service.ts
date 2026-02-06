import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { hashPassword, validatePassword } from 'src/utils/hash';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}
  async registerUser(dto: RegisterUserDto) {
    try {
      const hashedPassword = await hashPassword(dto.password);
      const newUser = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hashedPassword,
        },
      });
      const token = this.jwt.sign({
        id: newUser.id,
        email: newUser.email,
        type: newUser.type,
      });
      const { password, ...user } = newUser;
      return {
        success: true,
        message: 'Successfully registered user',
        data: { user, accessToken: token },
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async loginUser(dto: LoginUserDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (!existingUser)
        throw new NotFoundException('User with that email not found');
      const checkPassword = await validatePassword(
        dto.password,
        existingUser.password,
      );
      if (!checkPassword)
        throw new BadRequestException('Invalide email/password');
      const { password, ...user } = existingUser;
      const token = this.jwt.sign({
        id: existingUser.id,
        email: existingUser.email,
        type: existingUser.type,
      });
      return {
        success: true,
        message: 'Successfully logged in',
        data: { user, accessToken: token },
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async getLoggedInUser(userId: string) {
    try {
      const loggedInUser = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!loggedInUser) throw new NotFoundException('User not found');
      const { password, ...user } = loggedInUser;
      return {
        success: true,
        message: 'Successfully fetched user',
        data: { user },
      };
    } catch (e) {
      throw new Error(e);
    }
  }
}
