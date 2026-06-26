import { Test, TestingModule } from '@nestjs/testing';
import { LocationPageService } from './location-page.service';
import { PrismaService } from '@/prisma/prisma.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

jest.mock('cloudinary', () => ({
  v2: {
    config: jest.fn(),
    utils: {
      api_sign_request: jest.fn().mockReturnValue('mock_signature'),
    },
    uploader: {
      destroy: jest.fn().mockResolvedValue({ result: 'ok' }),
    },
  },
}));

describe('LocationPageService', () => {
  let service: LocationPageService;
  let prisma: PrismaService;

  const mockPage = {
    id: 1,
    citySlug: 'kolkata',
    serviceSlug: 'house-shifting',
    seoMetaTitle: 'Packers and Movers Kolkata to Delhi',
    seoMetaDescription: 'Best shifting service',
    headerTitle: 'Shift Now',
    headerIntroText: 'Affordable Rates',
    sections: { intro: 'Welcome' },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrisma = {
    locationPage: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    mockPrisma.locationPage.findMany = jest.fn();
    mockPrisma.locationPage.findUnique = jest.fn();
    mockPrisma.locationPage.create = jest.fn();
    mockPrisma.locationPage.update = jest.fn();
    mockPrisma.locationPage.delete = jest.fn();

    process.env.CLOUDINARY_API_SECRET = 'mock_secret';

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationPageService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<LocationPageService>(LocationPageService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllPages', () => {
    it('should retrieve all pages ordered by updatedAt desc', async () => {
      mockPrisma.locationPage.findMany.mockResolvedValueOnce([mockPage]);
      const result = await service.getAllPages();

      expect(result).toEqual([mockPage]);
      expect(mockPrisma.locationPage.findMany).toHaveBeenCalledWith({
        orderBy: { updatedAt: 'desc' },
      });
    });
  });

  describe('getPageBySlugs', () => {
    it('should throw NotFoundException if page is not found', async () => {
      mockPrisma.locationPage.findUnique.mockResolvedValueOnce(null);
      await expect(service.getPageBySlugs('kolkata', 'shifting')).rejects.toThrow(NotFoundException);
    });

    it('should return the location page if found', async () => {
      mockPrisma.locationPage.findUnique.mockResolvedValueOnce(mockPage);
      const result = await service.getPageBySlugs('Kolkata', 'House-Shifting');

      expect(result).toEqual(mockPage);
      expect(mockPrisma.locationPage.findUnique).toHaveBeenCalledWith({
        where: {
          citySlug_serviceSlug: {
            citySlug: 'kolkata',
            serviceSlug: 'house-shifting',
          },
        },
      });
    });
  });

  describe('createPage', () => {
    it('should throw BadRequestException if page for City and Service already exists', async () => {
      mockPrisma.locationPage.findUnique.mockResolvedValueOnce(mockPage);
      const dto = {
        citySlug: 'Kolkata',
        serviceSlug: 'House-Shifting',
        seoMetaTitle: 'Title',
        seoMetaDescription: 'Desc',
        headerTitle: 'Head',
        headerIntroText: 'Sub',
        sections: {},
      };

      await expect(service.createPage(dto)).rejects.toThrow(BadRequestException);
    });

    it('should create new location page successfully', async () => {
      mockPrisma.locationPage.findUnique.mockResolvedValueOnce(null);
      mockPrisma.locationPage.create.mockResolvedValueOnce(mockPage);
      const dto = {
        citySlug: 'Kolkata',
        serviceSlug: 'House-Shifting',
        seoMetaTitle: 'Title',
        seoMetaDescription: 'Desc',
        headerTitle: 'Head',
        headerIntroText: 'Sub',
        sections: { intro: 'Welcome' },
      };

      const result = await service.createPage(dto);
      expect(result).toEqual(mockPage);
      expect(mockPrisma.locationPage.create).toHaveBeenCalledWith({
        data: {
          ...dto,
          citySlug: 'kolkata',
          serviceSlug: 'house-shifting',
        },
      });
    });
  });

  describe('updatePage', () => {
    it('should throw NotFoundException if update fails or returns null', async () => {
      mockPrisma.locationPage.update.mockResolvedValueOnce(null);
      const dto = { seoMetaTitle: 'New Title' };

      await expect(service.updatePage(1, dto)).rejects.toThrow(NotFoundException);
    });

    it('should update location page successfully', async () => {
      const updated = { ...mockPage, seoMetaTitle: 'New Title' };
      mockPrisma.locationPage.update.mockResolvedValueOnce(updated);
      const dto = { seoMetaTitle: 'New Title' };

      const result = await service.updatePage(1, dto);
      expect(result).toEqual(updated);
    });
  });

  describe('deletePage', () => {
    it('should throw NotFoundException if page is not found', async () => {
      mockPrisma.locationPage.delete.mockResolvedValueOnce(null);
      await expect(service.deletePage(1)).rejects.toThrow(NotFoundException);
    });

    it('should delete and return page details', async () => {
      mockPrisma.locationPage.delete.mockResolvedValueOnce(mockPage);
      const result = await service.deletePage(1);

      expect(result).toEqual(mockPage);
      expect(mockPrisma.locationPage.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('getCloudinarySignature', () => {
    it('should sign request and return signature', () => {
      const params = { timestamp: 12345 };
      const signature = service.getCloudinarySignature(params);

      expect(signature).toBe('mock_signature');
      expect(cloudinary.utils.api_sign_request).toHaveBeenCalledWith(params, expect.any(String));
    });
  });

  describe('deleteCloudinaryImage', () => {
    it('should return early if imageUrl is empty', async () => {
      await service.deleteCloudinaryImage('');
      expect(cloudinary.uploader.destroy).not.toHaveBeenCalled();
    });

    it('should call cloudinary destroy to delete image', async () => {
      await service.deleteCloudinaryImage('http://cloudinary.com/v2/image/upload/v12345/my_image.png');
      expect(cloudinary.uploader.destroy).toHaveBeenCalledWith('my_image');
    });
  });
});
