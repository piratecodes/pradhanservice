import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { PrismaService } from '@/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('CityService', () => {
  let service: CityService;
  let prisma: PrismaService;

  const mockCity = {
    id: 1,
    cityName: 'Kolkata',
    citySlug: 'kolkata',
    title: 'Packers and Movers Kolkata',
    metaDescription: 'Best packers and movers in Kolkata',
    heading: 'Professional Movers',
    subHeading: 'Affordable Rates',
    aboutCity: 'Kolkata description',
    activeServices: ['house-shifting'],
    isActive: true,
  };

  const mockPrisma = {
    city: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    mockPrisma.city.create = jest.fn();
    mockPrisma.city.findMany = jest.fn();
    mockPrisma.city.findFirst = jest.fn();
    mockPrisma.city.findUnique = jest.fn();
    mockPrisma.city.update = jest.fn();
    mockPrisma.city.delete = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCity', () => {
    it('should create a city successfully', async () => {
      mockPrisma.city.create.mockResolvedValueOnce(mockCity);
      const dto = {
        cityName: 'Kolkata',
        citySlug: 'kolkata',
        title: 'Packers and Movers Kolkata',
        metaDescription: 'Best packers and movers in Kolkata',
        heading: 'Professional Movers',
        subHeading: 'Affordable Rates',
        aboutCity: 'Kolkata description',
        activeServices: ['house-shifting'],
      };

      const result = await service.createCity(dto);
      expect(result).toEqual(mockCity);
      expect(mockPrisma.city.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe('getAllCities', () => {
    it('should retrieve active cities by default', async () => {
      mockPrisma.city.findMany.mockResolvedValueOnce([mockCity]);
      const result = await service.getAllCities(false);

      expect(result).toEqual([mockCity]);
      expect(mockPrisma.city.findMany).toHaveBeenCalledWith({
        where: { isActive: true },
        orderBy: { cityName: 'asc' },
      });
    });

    it('should retrieve active cities filtered by service', async () => {
      mockPrisma.city.findMany.mockResolvedValueOnce([mockCity]);
      const result = await service.getAllCities(false, 'house-shifting');

      expect(result).toEqual([mockCity]);
      expect(mockPrisma.city.findMany).toHaveBeenCalledWith({
        where: { isActive: true, activeServices: { has: 'house-shifting' } },
        orderBy: { cityName: 'asc' },
      });
    });

    it('should retrieve all cities if all is true', async () => {
      mockPrisma.city.findMany.mockResolvedValueOnce([mockCity]);
      const result = await service.getAllCities(true);

      expect(result).toEqual([mockCity]);
      expect(mockPrisma.city.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: { cityName: 'asc' },
      });
    });
  });

  describe('getCityBySlug', () => {
    it('should throw NotFoundException if city does not exist or is inactive', async () => {
      mockPrisma.city.findFirst.mockResolvedValueOnce(null);
      await expect(service.getCityBySlug('kolkata')).rejects.toThrow(NotFoundException);
    });

    it('should return city if active and found', async () => {
      mockPrisma.city.findFirst.mockResolvedValueOnce(mockCity);
      const result = await service.getCityBySlug('kolkata');
      expect(result).toEqual(mockCity);
    });
  });

  describe('updateCity', () => {
    it('should throw NotFoundException if update fails or returns null', async () => {
      mockPrisma.city.update.mockResolvedValueOnce(null);
      const dto = { cityName: 'Kolkata New' };

      await expect(service.updateCity(1, dto)).rejects.toThrow(NotFoundException);
    });

    it('should update and return the city details', async () => {
      const updatedCity = { ...mockCity, cityName: 'Kolkata New' };
      mockPrisma.city.update.mockResolvedValueOnce(updatedCity);
      const dto = { cityName: 'Kolkata New' };

      const result = await service.updateCity(1, dto);
      expect(result).toEqual(updatedCity);
    });
  });

  describe('toggleCityStatus', () => {
    it('should throw NotFoundException if city not found', async () => {
      mockPrisma.city.findUnique.mockResolvedValueOnce(null);
      await expect(service.toggleCityStatus(1)).rejects.toThrow(NotFoundException);
    });

    it('should toggle and return the updated city status', async () => {
      mockPrisma.city.findUnique.mockResolvedValueOnce(mockCity);
      const toggledCity = { ...mockCity, isActive: false };
      mockPrisma.city.update.mockResolvedValueOnce(toggledCity);

      const result = await service.toggleCityStatus(1);
      expect(result.isActive).toBe(false);
      expect(mockPrisma.city.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { isActive: false },
      });
    });
  });

  describe('deleteCityBySlug', () => {
    it('should throw NotFoundException if deletion returns null', async () => {
      mockPrisma.city.delete.mockResolvedValueOnce(null);
      await expect(service.deleteCityBySlug('kolkata')).rejects.toThrow(NotFoundException);
    });

    it('should delete and return the deleted city', async () => {
      mockPrisma.city.delete.mockResolvedValueOnce(mockCity);
      const result = await service.deleteCityBySlug('kolkata');
      expect(result).toEqual(mockCity);
    });
  });
});
