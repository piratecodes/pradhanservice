import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateLocationPageDto, UpdateLocationPageDto } from './dto/location-page.dto';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class LocationPageService {
  constructor(private prisma: PrismaService) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async getAllPages() {
    return this.prisma.locationPage.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getPageBySlugs(citySlug: string, serviceSlug: string) {
    const page = await this.prisma.locationPage.findUnique({
      where: {
        citySlug_serviceSlug: {
          citySlug: citySlug.toLowerCase(),
          serviceSlug: serviceSlug.toLowerCase(),
        },
      },
    });

    if (!page) {
      throw new NotFoundException('No dynamic content found for this route');
    }
    return page;
  }

  async createPage(dto: CreateLocationPageDto) {
    const citySlug = dto.citySlug.toLowerCase();
    const serviceSlug = dto.serviceSlug.toLowerCase();

    const existing = await this.prisma.locationPage.findUnique({
      where: {
        citySlug_serviceSlug: { citySlug, serviceSlug },
      },
    });

    if (existing) {
      throw new BadRequestException('A page for this City and Service already exists!');
    }

    return this.prisma.locationPage.create({
      data: {
        ...dto,
        citySlug,
        serviceSlug,
        sections: dto.sections ? dto.sections : undefined,
      },
    });
  }

  async updatePage(id: number, dto: UpdateLocationPageDto) {
    const updatedPage = await this.prisma.locationPage.update({
      where: { id },
      data: {
        ...dto,
        sections: dto.sections ? dto.sections : undefined,
      },
    });

    if (!updatedPage) {
      throw new NotFoundException('Page not found');
    }

    return updatedPage;
  }

  async deletePage(id: number) {
    const page = await this.prisma.locationPage.delete({
      where: { id },
    });

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    return page;
  }

  getCloudinarySignature(paramsToSign: any) {
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
    );
    return signature;
  }

  async deleteCloudinaryImage(imageUrl: string) {
    if (!imageUrl) return;

    try {
      const splitUrl = imageUrl.split('/');
      const uploadIndex = splitUrl.findIndex((part) => part === 'upload');
      const publicIdWithExtension = splitUrl.slice(uploadIndex + 2).join('/');
      const publicId = publicIdWithExtension.substring(0, publicIdWithExtension.lastIndexOf('.'));

      await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      console.error('Cloudinary deletion error:', err);
    }
  }
}
