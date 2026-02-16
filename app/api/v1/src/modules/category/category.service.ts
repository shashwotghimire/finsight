import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateCategoryDto,
  CreateSubCategoryDto,
} from './dto/create-category.dto';
import {
  UpdateCategoryDto,
  UpdateSubCategoryDto,
} from './dto/update-category.dto';
@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(userId: string, dto: CreateCategoryDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('user not found');
    const category = await this.prisma.category.create({
      data: {
        userId,
        name: dto.name,
      },
    });
    return {
      success: true,
      message: 'Created category successfully',
      data: {
        category,
      },
    };
  }

  async createSubCategory({
    userId,
    categoryId,
    dto,
  }: {
    userId: string;
    categoryId: string;
    dto: CreateSubCategoryDto;
  }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (!category) throw new NotFoundException('Category not found');
    if (category.userId !== userId)
      throw new ConflictException('User id and category id mismatch');
    const subCategory = await this.prisma.subCategory.create({
      data: {
        categoryId,
        name: dto.name,
      },
    });
    return {
      success: true,
      message: 'Created sub category successfully',
      data: { subCategory },
    };
  }
  async getCategories({
    userId,
    page = 1,
    limit = 10,
    query = '',
  }: {
    userId: string;
    page?: number;
    limit?: number;
    query?: string;
  }) {
    const offset = (page - 1) * limit;
    const where: any = { userId };
    if (query) {
      where.name = { contains: query, mode: 'insensitive' };
    }
    const categories = await this.prisma.category.findMany({
      where,
      include: {
        subCategories: true,
      },
      take: limit,
      skip: offset,
    });
    return {
      success: 'truem',
      message: 'Fetched categories successfully',
      data: { categories },
    };
  }
  async getSubCategories({
    categoryId,
    page = 1,
    limit = 10,
    query = '',
  }: {
    categoryId: string;
    page?: number;
    limit?: number;
    query?: string;
  }) {
    const offset = (page - 1) * limit;
    const where: any = { categoryId };
    if (query) {
      where.name = { contains: query, mode: 'insensitive' };
    }
    const categories = await this.prisma.subCategory.findMany({
      where,
      take: limit,
      skip: offset,
    });
    return {
      success: 'truem',
      message: 'Fetched categories successfully',
      data: { categories },
    };
  }
  async updateCategory({
    userId,
    categoryId,
    dto,
  }: {
    userId: string;
    categoryId: string;
    dto: UpdateCategoryDto;
  }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (!category) throw new NotFoundException('Category not found');
    if (category.userId !== userId)
      throw new ConflictException('User id and category id mismatch');
    const updatedCategory = await this.prisma.category.update({
      where: { id: categoryId },
      data: {
        name: dto.name,
      },
    });
    return {
      success: true,
      message: 'Category updated successfully',
      data: { category: updatedCategory },
    };
  }
  async updateSubCategory({
    userId,
    subCategoryId,
    categoryId,
    dto,
  }: {
    userId: string;
    subCategoryId: string;
    categoryId: string;
    dto: UpdateSubCategoryDto;
  }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) throw new NotFoundException('Category not found');
    if (category.userId !== userId)
      throw new ConflictException('User id and category id mismatch');
    const subCategory = await this.prisma.subCategory.findUnique({
      where: { id: subCategoryId, categoryId },
    });
    if (!subCategory) throw new NotFoundException('Sub category not found');
    const updatedSubCategory = await this.prisma.subCategory.update({
      where: { id: subCategoryId, categoryId },
      data: {
        name: dto.name,
      },
    });
    return {
      success: true,
      message: 'Sub category updated successfully',
      data: { subCategory: updatedSubCategory },
    };
  }
  async deleteCategory({
    userId,
    categoryId,
  }: {
    userId: string;
    categoryId: string;
  }) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException('User not found');
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) throw new NotFoundException('Category not found');
    if (category.userId !== userId)
      throw new ConflictException('User id and category id mismatch');
    await this.prisma.category.delete({ where: { id: categoryId } });
    return {
      success: true,
      message: 'Category deleted successfully',
    };
  }
  async deleteSubCategory({
    userId,
    subCategoryId,
    categoryId,
  }: {
    userId: string;
    subCategoryId: string;
    categoryId: string;
  }) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException('User not found');
    const subCategory = await this.prisma.subCategory.findUnique({
      where: { id: subCategoryId, categoryId },
    });
    if (!subCategory) throw new NotFoundException('Sub category not found');
    await this.prisma.subCategory.delete({
      where: { id: subCategoryId, categoryId },
    });
    return {
      success: true,
      message: 'Sub category deleted successfully',
    };
  }
}
