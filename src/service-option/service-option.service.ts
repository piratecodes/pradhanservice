import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceOptionDto, UpdateServiceOptionDto } from './dto/service-option.dto';

@Injectable()
export class ServiceOptionService {
  constructor(private prisma: PrismaService) {}

  async createOption(dto: CreateServiceOptionDto) {
    return this.prisma.serviceOption.create({
      data: dto,
    });
  }

  async getAllOptions(serviceType?: string) {
    const where = serviceType ? { serviceType } : {};
    return this.prisma.serviceOption.findMany({
      where,
      orderBy: [
        { serviceType: 'asc' },
        { order: 'asc' },
      ],
    });
  }

  async getOptionsByService(serviceSlug: string) {
    return this.prisma.serviceOption.findMany({
      where: {
        serviceType: serviceSlug,
        isActive: true,
      },
      orderBy: { order: 'asc' },
    });
  }

  async updateOption(id: number, dto: UpdateServiceOptionDto) {
    const option = await this.prisma.serviceOption.update({
      where: { id },
      data: dto,
    });
    if (!option) {
      throw new NotFoundException('No service option found with that ID');
    }
    return option;
  }

  async toggleOptionStatus(id: number) {
    const option = await this.prisma.serviceOption.findUnique({ where: { id } });
    if (!option) {
      throw new NotFoundException('No service option found with that ID');
    }

    return this.prisma.serviceOption.update({
      where: { id },
      data: { isActive: !option.isActive },
    });
  }

  async deleteOption(id: number) {
    const option = await this.prisma.serviceOption.delete({
      where: { id },
    });
    if (!option) {
      throw new NotFoundException('No service option found with that ID');
    }
    return option;
  }
}
