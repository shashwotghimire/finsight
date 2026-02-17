import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTransferDto {
  @IsString()
  toAccountId: string;

  @IsString()
  fromAccountId: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  note?: string;
}
