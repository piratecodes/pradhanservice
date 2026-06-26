import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';

describe('LocationPageController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  let authToken: string;
  let createdPageId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();

    // Clean up
    await prisma.locationPage.deleteMany();
    await prisma.admin.deleteMany();

    // Setup Admin and Login
    const adminData = {
      name: 'Super Admin',
      username: 'adminlocation',
      email: 'adminlocation@example.com',
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
    await prisma.locationPage.deleteMany();
    await prisma.admin.deleteMany();
    await app.close();
  });

  describe('Location Page Routes', () => {
    const pageDto = {
      citySlug: 'mumbai',
      serviceSlug: 'house-shifting',
      headerTitle: 'House Shifting in Mumbai',
      seoMetaTitle: 'Best House Shifting in Mumbai',
    };

    it('/location-pages (POST) - Create Page', async () => {
      const response = await request(app.getHttpServer())
        .post('/location-pages')
        .set('Authorization', `Bearer ${authToken}`)
        .send(pageDto)
        .expect(HttpStatus.CREATED);

      expect(response.body.success).toBe(true);
      expect(response.body.data.page.citySlug).toBe(pageDto.citySlug);
      createdPageId = response.body.data.page.id;
    });

    it('/location-pages (GET) - Get All Pages (Admin)', async () => {
      const response = await request(app.getHttpServer())
        .get('/location-pages')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(HttpStatus.OK);

      expect(response.body.success).toBe(true);
      expect(response.body.data.pages.length).toBeGreaterThan(0);
    });

    it('/location-pages/:citySlug/:serviceSlug (GET) - Get Page', async () => {
      const response = await request(app.getHttpServer())
        .get(`/location-pages/${pageDto.citySlug}/${pageDto.serviceSlug}`)
        .expect(HttpStatus.OK);

      expect(response.body.success).toBe(true);
      expect(response.body.data.page.headerTitle).toBe(pageDto.headerTitle);
    });

    it('/location-pages/:id (PATCH) - Update Page', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/location-pages/${createdPageId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ headerTitle: 'Updated House Shifting in Mumbai' })
        .expect(HttpStatus.OK);

      expect(response.body.success).toBe(true);
      expect(response.body.data.page.headerTitle).toBe('Updated House Shifting in Mumbai');
    });

    it('/location-pages/:id (DELETE) - Delete Page', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/location-pages/${createdPageId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(HttpStatus.OK);

      expect(response.body.success).toBe(true);
    });
  });
});
