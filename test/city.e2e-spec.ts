import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';

describe('CityController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  let authToken: string;
  let createdCityId: number;
  const testCitySlug = 'test-city-slug';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();

    // Clean up
    await prisma.city.deleteMany();
    await prisma.admin.deleteMany();

    // Setup Admin and Login
    const adminData = {
      name: 'Super Admin',
      username: 'admincity',
      email: 'admincity@example.com',
      phone: '0987654321',
      password: 'password123',
      role: 'SUPER_ADMIN',
    };

    await request(app.getHttpServer()).post('/auth/setup').send(adminData);
    const loginRes = await request(app.getHttpServer()).post('/auth/login').send({
      username: adminData.username,
      password: adminData.password,
    });
    authToken = loginRes.body.data.token;
  });

  afterAll(async () => {
    await prisma.city.deleteMany();
    await prisma.admin.deleteMany();
    await app.close();
  });

  describe('City Routes', () => {
    const cityDto = {
      cityName: 'Test City',
      citySlug: testCitySlug,
      isActive: true,
      subTowns: ['Area 1', 'Area 2'],
    };

    it('/cities (POST) - Create City', async () => {
      const response = await request(app.getHttpServer())
        .post('/cities')
        .set('Authorization', `Bearer ${authToken}`)
        .send(cityDto)
        .expect(HttpStatus.CREATED);

      expect(response.body.success).toBe(true);
      expect(response.body.data.city.cityName).toBe(cityDto.cityName);
      createdCityId = response.body.data.city.id;
    });

    it('/cities (GET) - Get All Cities', async () => {
      const response = await request(app.getHttpServer())
        .get('/cities?all=true')
        .expect(HttpStatus.OK);

      expect(response.body.success).toBe(true);
      expect(response.body.data.cities.length).toBeGreaterThan(0);
    });

    it('/cities/slug/:slug (GET) - Get By Slug', async () => {
      const response = await request(app.getHttpServer())
        .get(`/cities/slug/${testCitySlug}`)
        .expect(HttpStatus.OK);

      expect(response.body.success).toBe(true);
      expect(response.body.data.city.cityName).toBe(cityDto.cityName);
    });

    it('/cities/:id (PATCH) - Update City', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/cities/${createdCityId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ cityName: 'Updated Test City' })
        .expect(HttpStatus.OK);

      expect(response.body.success).toBe(true);
      expect(response.body.data.city.cityName).toBe('Updated Test City');
    });

    it('/cities/:id/toggle (PATCH) - Toggle City Status', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/cities/${createdCityId}/toggle`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(HttpStatus.OK);

      expect(response.body.success).toBe(true);
      expect(response.body.data.city.isActive).toBe(false); // since it was true
    });

    it('/cities/:slug (DELETE) - Delete City', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/cities/${testCitySlug}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(HttpStatus.OK);

      expect(response.body.success).toBe(true);
    });
  });
});
