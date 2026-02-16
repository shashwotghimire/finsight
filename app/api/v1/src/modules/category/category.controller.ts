import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from '../auth/common/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from '../auth/common/interface/authenticatedRequest';
import {
  CreateCategoryDto,
  CreateSubCategoryDto,
} from './dto/create-category.dto';
import {
  UpdateCategoryDto,
  UpdateSubCategoryDto,
} from './dto/update-category.dto';

@UseGuards(AuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(
    @Body() dto: CreateCategoryDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.categoryService.createCategory(req.user.id, dto);
  }

  @Post(':categoryId/sub-category')
  async createSubCategory(
    @Param('categoryId') categoryId: string,
    @Body() dto: CreateSubCategoryDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.categoryService.createSubCategory({
      userId: req.user.id,
      categoryId,
      dto,
    });
  }

  @Get()
  async getCategories(
    @Req() req: AuthenticatedRequest,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('query') query?: string,
  ) {
    return await this.categoryService.getCategories({
      userId: req.user.id,
      page,
      limit,
      query,
    });
  }

  @Get(':categoryId/sub-category')
  async getSubCategories(
    @Param('categoryId') categoryId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('query') query?: string,
  ) {
    return await this.categoryService.getSubCategories({
      categoryId,
      page,
      limit,
      query,
    });
  }

  @Patch(':categoryId')
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() dto: UpdateCategoryDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.categoryService.updateCategory({
      userId: req.user.id,
      categoryId,
      dto,
    });
  }

  @Patch(':categoryId/sub-category/:subCategoryId')
  async updateSubCategory(
    @Param('categoryId') categoryId: string,
    @Param('subCategoryId') subCategoryId: string,
    @Body() dto: UpdateSubCategoryDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.categoryService.updateSubCategory({
      userId: req.user.id,
      subCategoryId,
      categoryId,
      dto,
    });
  }

  @Delete(':categoryId')
  async deleteCategory(
    @Param('categoryId') categoryId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.categoryService.deleteCategory({
      userId: req.user.id,
      categoryId,
    });
  }

  @Delete(':categoryId/sub-category/:subCategoryId')
  async deleteSubCategory(
    @Param('categoryId') categoryId: string,
    @Param('subCategoryId') subCategoryId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.categoryService.deleteSubCategory({
      userId: req.user.id,
      subCategoryId,
      categoryId,
    });
  }
}
