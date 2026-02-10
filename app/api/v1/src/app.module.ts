import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { PrismaModule } from './module/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from './module/cloudinary/cloudinary.module';
import { AccountModule } from './module/account/account.module';
@Module({
  imports: [AuthModule, PrismaModule, ConfigModule.forRoot({ isGlobal: true }), CloudinaryModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
