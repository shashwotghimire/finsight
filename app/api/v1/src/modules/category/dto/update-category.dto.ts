import { IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  name: string;
}

export class UpdateSubCategoryDto {
  @IsString()
  name: string;
}
