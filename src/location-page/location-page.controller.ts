import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, UseInterceptors, Req } from '@nestjs/common';
import type { Request } from 'express';
import { LocationPageService } from './location-page.service';
import { CreateLocationPageDto, UpdateLocationPageDto } from './dto/location-page.dto';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/auth/decorators/roles.decorator';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('location-pages')
export class LocationPageController {
  constructor(private readonly locationPageService: LocationPageService) {}

  @Get(':citySlug/:serviceSlug')
  @UseInterceptors(CacheInterceptor)
  async getPageBySlugs(@Param('citySlug') citySlug: string, @Param('serviceSlug') serviceSlug: string) {
    const page = await this.locationPageService.getPageBySlugs(citySlug, serviceSlug);
    return { success: true, message: 'Page data retrieved', data: { page } };
  }

  @Post('cloudinary-signature')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  getCloudinarySignature(@Req() req: Request) {
    const signature = this.locationPageService.getCloudinarySignature(req.body);
    return { success: true, data: { signature } };
  }

  @Post('delete-image')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  async deleteCloudinaryImage(@Body('imageUrl') imageUrl: string) {
    await this.locationPageService.deleteCloudinaryImage(imageUrl);
    return { success: true, message: 'Image permanently deleted from Cloudinary' };
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  async getAllPages() {
    const pages = await this.locationPageService.getAllPages();
    return { success: true, message: 'SEO pages retrieved', data: { count: pages.length, pages } };
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  async createPage(@Body() dto: CreateLocationPageDto) {
    const page = await this.locationPageService.createPage(dto);
    return { success: true, message: 'SEO Page Published!', data: { page } };
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  async updatePage(@Param('id') id: string, @Body() dto: UpdateLocationPageDto) {
    const page = await this.locationPageService.updatePage(+id, dto);
    return { success: true, message: 'Content updated successfully', data: { page } };
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  async deletePage(@Param('id') id: string) {
    await this.locationPageService.deletePage(+id);
    return { success: true, message: 'SEO Page deleted permanently', data: null };
  }
}
