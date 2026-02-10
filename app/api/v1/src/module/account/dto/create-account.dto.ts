import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { AccountType, Currency } from 'src/generated/prisma/enums';

export class CreateAccountDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(AccountType)
  accountType?: AccountType;

  @IsNumber()
  balance: number;

  @IsEnum(Currency)
  @IsOptional()
  currency?: Currency;
}
