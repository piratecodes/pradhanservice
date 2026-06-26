import { Test, TestingModule } from '@nestjs/testing';
import { LeadService } from './lead.service';
import { PrismaService } from '@/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('LeadService', () => {
  let service: LeadService;
  let prisma: PrismaService;

  const mockLead = {
    id: 1,
    customerName: 'Customer Name',
    customerEmail: 'cust@example.com',
    customerPhone: '1234567890',
    originCity: 'Kolkata',
    destinationCity: 'Delhi',
    serviceRequested: 'house-shifting',
    shiftingDate: new Date('2026-06-15'),
    status: 'NEW',
    createdAt: new Date(),
  };

  const mockPrisma = {
    lead: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    mockPrisma.lead.create = jest.fn();
    mockPrisma.lead.findMany = jest.fn();
    mockPrisma.lead.findUnique = jest.fn();
    mockPrisma.lead.update = jest.fn();
    mockPrisma.lead.delete = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<LeadService>(LeadService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createLead', () => {
    it('should create a lead successfully, parsing dates if provided', async () => {
      mockPrisma.lead.create.mockResolvedValueOnce(mockLead);
      const dto = {
        customerName: 'Customer Name',
        customerEmail: 'cust@example.com',
        customerPhone: '1234567890',
        originCity: 'Kolkata',
        destinationCity: 'Delhi',
        serviceRequested: 'house-shifting',
        shiftingDate: '2026-06-15',
      };

      const result = await service.createLead(dto);
      expect(result).toEqual(mockLead);
      expect(mockPrisma.lead.create).toHaveBeenCalledWith({
        data: {
          ...dto,
          shiftingDate: new Date(dto.shiftingDate),
        },
      });
    });
  });

  describe('getAllLeads', () => {
    it('should query leads without filters by default', async () => {
      mockPrisma.lead.findMany.mockResolvedValueOnce([mockLead]);
      const result = await service.getAllLeads();

      expect(result).toEqual([mockLead]);
      expect(mockPrisma.lead.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should query leads with filters (status, service, city)', async () => {
      mockPrisma.lead.findMany.mockResolvedValueOnce([mockLead]);
      const result = await service.getAllLeads('NEW', 'house-shifting', 'Kolkata');

      expect(result).toEqual([mockLead]);
      expect(mockPrisma.lead.findMany).toHaveBeenCalledWith({
        where: {
          status: 'NEW',
          serviceRequested: 'house-shifting',
          originCity: 'Kolkata',
        },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('getLeadById', () => {
    it('should throw NotFoundException if lead not found', async () => {
      mockPrisma.lead.findUnique.mockResolvedValueOnce(null);
      await expect(service.getLeadById(99)).rejects.toThrow(NotFoundException);
    });

    it('should return lead details if found', async () => {
      mockPrisma.lead.findUnique.mockResolvedValueOnce(mockLead);
      const result = await service.getLeadById(1);
      expect(result).toEqual(mockLead);
    });
  });

  describe('updateLead', () => {
    it('should throw NotFoundException if update returns null', async () => {
      mockPrisma.lead.update.mockResolvedValueOnce(null);
      await expect(service.updateLead(1, { status: 'CONTACTED' })).rejects.toThrow(NotFoundException);
    });

    it('should update and return lead details', async () => {
      const updated = { ...mockLead, status: 'CONTACTED' };
      mockPrisma.lead.update.mockResolvedValueOnce(updated);

      const result = await service.updateLead(1, { status: 'CONTACTED' });
      expect(result).toEqual(updated);
    });
  });

  describe('deleteLead', () => {
    it('should throw NotFoundException if delete returns null', async () => {
      mockPrisma.lead.delete.mockResolvedValueOnce(null);
      await expect(service.deleteLead(1)).rejects.toThrow(NotFoundException);
    });

    it('should delete and return true', async () => {
      mockPrisma.lead.delete.mockResolvedValueOnce(mockLead);
      const result = await service.deleteLead(1);
      expect(result).toBe(true);
    });
  });
});
