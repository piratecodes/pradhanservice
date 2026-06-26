import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateLeadDto, UpdateLeadDto } from './dto/lead.dto';

@Injectable()
export class LeadService {
  constructor(private prisma: PrismaService) {}

  async createLead(dto: CreateLeadDto) {
    const data: any = { ...dto };
    if (dto.shiftingDate) {
      data.shiftingDate = new Date(dto.shiftingDate);
    }
    
    return this.prisma.lead.create({
      data,
    });
  }

  async getAllLeads(status?: string, service?: string, city?: string) {
    const where: any = {};
    if (status && status !== 'All') {
      where.status = status;
    }
    if (service && service !== 'All') {
      where.serviceRequested = service;
    }
    if (city) {
      where.originCity = city;
    }

    return this.prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getLeadById(id: number) {
    const lead = await this.prisma.lead.findUnique({
      where: { id },
    });
    if (!lead) {
      throw new NotFoundException('No lead found with that ID');
    }
    return lead;
  }

  async updateLead(id: number, dto: UpdateLeadDto) {
    const lead = await this.prisma.lead.update({
      where: { id },
      data: dto,
    });
    if (!lead) {
      throw new NotFoundException('No lead found with that ID');
    }
    return lead;
  }

  async deleteLead(id: number) {
    const lead = await this.prisma.lead.delete({
      where: { id },
    });
    if (!lead) {
      throw new NotFoundException('No lead found with that ID');
    }
    return true;
  }
}
