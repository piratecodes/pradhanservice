import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { CreateCityDto, UpdateCityDto } from './dto/city.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ExecutionContext } from '@nestjs/common';

describe('CityController', () => {
  let controller: CityController;
  let service: CityService;

  const mockCityService = {
    getAllCities: jest.fn(),
    getCityBySlug: jest.fn(),
    createCity: jest.fn(),
    updateCity: jest.fn(),
    toggleCityStatus: jest.fn(),
    deleteCityBySlug: jest.fn(),
  };

  const mockGuard = {
    canActivate: (context: ExecutionContext) => true,
  };

  // We mock CACHE_MANAGER in case CacheInterceptor expects it in dependency injection context
  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [
        { provide: CityService, useValue: mockCityService },
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockGuard)
      .overrideGuard(RolesGuard)
      .useValue(mockGuard)
      .compile();

    controller = module.get<CityController>(CityController);
    service = module.get<CityService>(CityService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllCities', () => {
    it('should retrieve all cities successfully', async () => {
      const cities = [{ id: 1, cityName: 'A' }];
      mockCityService.getAllCities.mockResolvedValueOnce(cities);

      const res = await controller.getAllCities('true', 'shifting');
      expect(res).toEqual({
        success: true,
        message: 'Cities retrieved',
        data: { count: 1, cities },
      });
      expect(mockCityService.getAllCities).toHaveBeenCalledWith(true, 'shifting');
    });
  });

  describe('getCityBySlug', () => {
    it('should retrieve city by slug', async () => {
      const city = { id: 1, citySlug: 'kolkata' };
      mockCityService.getCityBySlug.mockResolvedValueOnce(city);

      const res = await controller.getCityBySlug('kolkata');
      expect(res).toEqual({
        success: true,
        message: 'City SEO data retrieved',
        data: { city },
      });
      expect(mockCityService.getCityBySlug).toHaveBeenCalledWith('kolkata');
    });
  });

  describe('createCity', () => {
    it('should add city successfully', async () => {
      const dto: CreateCityDto = {
        cityName: 'Kolkata',
        citySlug: 'kolkata',
        activeServices: [],
      };
      const created = { id: 1, ...dto };
      mockCityService.createCity.mockResolvedValueOnce(created);

      const res = await controller.createCity(dto);
      expect(res).toEqual({
        success: true,
        message: 'City added successfully',
        data: { city: created },
      });
      expect(mockCityService.createCity).toHaveBeenCalledWith(dto);
    });
  });

  describe('updateCity', () => {
    it('should update city successfully', async () => {
      const dto: UpdateCityDto = { cityName: 'New Name' };
      const updated = { id: 1, cityName: 'New Name' };
      mockCityService.updateCity.mockResolvedValueOnce(updated);

      const res = await controller.updateCity('1', dto);
      expect(res).toEqual({
        success: true,
        message: 'City updated successfully',
        data: { city: updated },
      });
      expect(mockCityService.updateCity).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('toggleCityStatus', () => {
    it('should toggle city status successfully', async () => {
      const city = { id: 1, isActive: true };
      mockCityService.toggleCityStatus.mockResolvedValueOnce(city);

      const res = await controller.toggleCityStatus('1');
      expect(res).toEqual({
        success: true,
        message: 'City is now Active',
        data: { city },
      });
      expect(mockCityService.toggleCityStatus).toHaveBeenCalledWith(1);
    });
  });

  describe('deleteCityBySlug', () => {
    it('should delete city successfully', async () => {
      mockCityService.deleteCityBySlug.mockResolvedValueOnce({});

      const res = await controller.deleteCityBySlug('kolkata');
      expect(res).toEqual({
        success: true,
        message: "City 'kolkata' deleted successfully",
        data: null,
      });
      expect(mockCityService.deleteCityBySlug).toHaveBeenCalledWith('kolkata');
    });
  });
});
