import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Query, HttpCode, HttpStatus, UseInterceptors, Inject } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto, UpdateCityDto } from './dto/city.dto';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/auth/decorators/roles.decorator';
import { CacheInterceptor, CacheKey, CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Controller('cities')
export class CityController {
  constructor(
    private readonly cityService: CityService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('all_cities')
  async getAllCities(@Query('all') all: string, @Query('service') service: string) {
    const cities = await this.cityService.getAllCities(all === 'true', service);
    return { success: true, message: 'Cities retrieved', data: { count: cities.length, cities } };
  }

  @Get('slug/:slug')
  @UseInterceptors(CacheInterceptor)
  async getCityBySlug(@Param('slug') slug: string) {
    const city = await this.cityService.getCityBySlug(slug);
    return { success: true, message: 'City SEO data retrieved', data: { city } };
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  @HttpCode(HttpStatus.CREATED)
  async createCity(@Body() dto: CreateCityDto) {
    const city = await this.cityService.createCity(dto);
    await this.cacheManager.del('all_cities');
    return { success: true, message: 'City added successfully', data: { city } };
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  async updateCity(@Param('id') id: string, @Body() dto: UpdateCityDto) {
    const city = await this.cityService.updateCity(+id, dto);
    await this.cacheManager.del('all_cities');
    return { success: true, message: 'City updated successfully', data: { city } };
  }

  @Patch(':id/toggle')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ADMIN')
  async toggleCityStatus(@Param('id') id: string) {
    const city = await this.cityService.toggleCityStatus(+id);
    await this.cacheManager.del('all_cities');
    return { success: true, message: `City is now ${city.isActive ? 'Active' : 'Inactive'}`, data: { city } };
  }

  @Delete(':slug')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  async deleteCityBySlug(@Param('slug') slug: string) {
    await this.cityService.deleteCityBySlug(slug);
    await this.cacheManager.del('all_cities');
    return { success: true, message: `City '${slug}' deleted successfully`, data: null };
  }
}
