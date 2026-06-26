import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCityDto, UpdateCityDto } from './dto/city.dto';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}

  async createCity(dto: CreateCityDto) {
    return this.prisma.city.create({
      data: dto,
    });
  }

  async getAllCities(all: boolean = false, service?: string) {
    let where: any = all ? {} : { isActive: true };
    if (service) {
      where.activeServices = { has: service };
    }

    return this.prisma.city.findMany({
      where,
      orderBy: { cityName: 'asc' },
    });
  }

  async getCityBySlug(slug: string) {
    const city = await this.prisma.city.findFirst({
      where: { citySlug: slug, isActive: true },
    });
    if (!city) {
      throw new NotFoundException('City not found or is currently inactive');
    }
    return city;
  }

  async updateCity(id: number, dto: UpdateCityDto) {
    const city = await this.prisma.city.update({
      where: { id },
      data: dto,
    });
    if (!city) {
      throw new NotFoundException('No city found with that ID');
    }
    return city;
  }

  async toggleCityStatus(id: number) {
    const city = await this.prisma.city.findUnique({ where: { id } });
    if (!city) {
      throw new NotFoundException('No city found with that ID');
    }

    return this.prisma.city.update({
      where: { id },
      data: { isActive: !city.isActive },
    });
  }

  async deleteCityBySlug(slug: string) {
    const city = await this.prisma.city.delete({
      where: { citySlug: slug },
    });
    if (!city) {
      throw new NotFoundException('No city found with that slug');
    }
    return city;
  }
}
