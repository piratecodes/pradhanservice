import { IsString, IsNotEmpty, IsOptional, IsBoolean, MaxLength, IsObject, IsArray } from 'class-validator';

export class GalleryImageDto {
  @IsString()
  url: string;

  @IsString()
  @IsOptional()
  alt?: string;
}

export class CreateGalleryDto {
  @IsString()
  @IsNotEmpty()
  categoryName: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @IsObject()
  @IsOptional()
  featuredImage?: GalleryImageDto;

  @IsArray()
  @IsOptional()
  images?: GalleryImageDto[];
}

export class UpdateGalleryDto {
  @IsString()
  @IsOptional()
  categoryName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @IsObject()
  @IsOptional()
  featuredImage?: GalleryImageDto;

  @IsArray()
  @IsOptional()
  images?: GalleryImageDto[];
}
