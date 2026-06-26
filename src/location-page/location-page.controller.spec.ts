import { Test, TestingModule } from '@nestjs/testing';
import { LocationPageController } from './location-page.controller';
import { LocationPageService } from './location-page.service';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { CreateLocationPageDto, UpdateLocationPageDto } from './dto/location-page.dto';
import { ExecutionContext } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('LocationPageController', () => {
  let controller: LocationPageController;
  let service: LocationPageService;

  const mockLocationPageService = {
    getPageBySlugs: jest.fn(),
    getCloudinarySignature: jest.fn(),
    deleteCloudinaryImage: jest.fn(),
    getAllPages: jest.fn(),
    createPage: jest.fn(),
    updatePage: jest.fn(),
    deletePage: jest.fn(),
  };

  const mockGuard = {
    canActivate: (context: ExecutionContext) => true,
  };

  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationPageController],
      providers: [
        { provide: LocationPageService, useValue: mockLocationPageService },
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockGuard)
      .overrideGuard(RolesGuard)
      .useValue(mockGuard)
      .compile();

    controller = module.get<LocationPageController>(LocationPageController);
    service = module.get<LocationPageService>(LocationPageService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPageBySlugs', () => {
    it('should retrieve location page by slugs successfully', async () => {
      const page = { id: 1, citySlug: 'kolkata', serviceSlug: 'shifting' };
      mockLocationPageService.getPageBySlugs.mockResolvedValueOnce(page);

      const res = await controller.getPageBySlugs('kolkata', 'shifting');
      expect(res).toEqual({
        success: true,
        message: 'Page data retrieved',
        data: { page },
      });
      expect(mockLocationPageService.getPageBySlugs).toHaveBeenCalledWith('kolkata', 'shifting');
    });
  });

  describe('getCloudinarySignature', () => {
    it('should generate signature successfully', () => {
      mockLocationPageService.getCloudinarySignature.mockReturnValueOnce('signature');

      const res = controller.getCloudinarySignature({ timestamp: 123 });
      expect(res).toEqual({
        success: true,
        data: { signature: 'signature' },
      });
      expect(mockLocationPageService.getCloudinarySignature).toHaveBeenCalledWith({ timestamp: 123 });
    });
  });

  describe('deleteCloudinaryImage', () => {
    it('should trigger deletion from Cloudinary successfully', async () => {
      mockLocationPageService.deleteCloudinaryImage.mockResolvedValueOnce(undefined);

      const res = await controller.deleteCloudinaryImage('http://image.png');
      expect(res).toEqual({
        success: true,
        message: 'Image permanently deleted from Cloudinary',
      });
      expect(mockLocationPageService.deleteCloudinaryImage).toHaveBeenCalledWith('http://image.png');
    });
  });

  describe('getAllPages', () => {
    it('should retrieve all pages successfully', async () => {
      const pages = [{ id: 1, title: 'Page' }];
      mockLocationPageService.getAllPages.mockResolvedValueOnce(pages);

      const res = await controller.getAllPages();
      expect(res).toEqual({
        success: true,
        message: 'SEO pages retrieved',
        data: { count: 1, pages },
      });
      expect(mockLocationPageService.getAllPages).toHaveBeenCalled();
    });
  });

  describe('createPage', () => {
    it('should create dynamic content page successfully', async () => {
      const dto: CreateLocationPageDto = {
        citySlug: 'kolkata',
        serviceSlug: 'shifting',
        seoMetaTitle: 'Title',
        seoMetaDescription: 'Desc',
        headerTitle: 'Heading',
        headerIntroText: 'Sub',
        sections: {},
      };
      const created = { id: 1, ...dto };
      mockLocationPageService.createPage.mockResolvedValueOnce(created);

      const res = await controller.createPage(dto);
      expect(res).toEqual({
        success: true,
        message: 'SEO Page Published!',
        data: { page: created },
      });
      expect(mockLocationPageService.createPage).toHaveBeenCalledWith(dto);
    });
  });

  describe('updatePage', () => {
    it('should update dynamic content page successfully', async () => {
      const dto: UpdateLocationPageDto = { seoMetaTitle: 'New Title' };
      const updated = { id: 1, seoMetaTitle: 'New Title' };
      mockLocationPageService.updatePage.mockResolvedValueOnce(updated);

      const res = await controller.updatePage('1', dto);
      expect(res).toEqual({
        success: true,
        message: 'Content updated successfully',
        data: { page: updated },
      });
      expect(mockLocationPageService.updatePage).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('deletePage', () => {
    it('should delete dynamic content page successfully', async () => {
      mockLocationPageService.deletePage.mockResolvedValueOnce({});

      const res = await controller.deletePage('1');
      expect(res).toEqual({
        success: true,
        message: 'SEO Page deleted permanently',
        data: null,
      });
      expect(mockLocationPageService.deletePage).toHaveBeenCalledWith(1);
    });
  });
});
