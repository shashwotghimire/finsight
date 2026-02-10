import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { AccountType, Currency } from 'src/generated/prisma/enums';

export class UpdateAccountDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEnum(AccountType)
  accountType?: AccountType;

  @IsNumber()
  @IsOptional()
  balance?: number;

  @IsEnum(Currency)
  @IsOptional()
  currency?: Currency;
}
