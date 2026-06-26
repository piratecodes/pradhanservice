import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class CreateLocationPageDto {
  @IsString()
  @IsNotEmpty()
  citySlug: string;

  @IsString()
  @IsNotEmpty()
  serviceSlug: string;

  @IsString()
  @IsOptional()
  seoMetaTitle?: string;

  @IsString()
  @IsOptional()
  seoMetaDescription?: string;

  @IsString()
  @IsOptional()
  seoMetaKeywords?: string;

  @IsString()
  @IsOptional()
  seoCanonicalUrl?: string;

  @IsBoolean()
  @IsOptional()
  seoIsNoIndex?: boolean;

  @IsString()
  @IsOptional()
  seoJsonLdSchema?: string;

  @IsString()
  @IsOptional()
  headerTitle?: string;

  @IsString()
  @IsOptional()
  headerIntroText?: string;

  @IsArray()
  @IsOptional()
  sections?: any[];
}

export class UpdateLocationPageDto {
  @IsString()
  @IsOptional()
  seoMetaTitle?: string;

  @IsString()
  @IsOptional()
  seoMetaDescription?: string;

  @IsString()
  @IsOptional()
  seoMetaKeywords?: string;

  @IsString()
  @IsOptional()
  seoCanonicalUrl?: string;

  @IsBoolean()
  @IsOptional()
  seoIsNoIndex?: boolean;

  @IsString()
  @IsOptional()
  seoJsonLdSchema?: string;

  @IsString()
  @IsOptional()
  headerTitle?: string;

  @IsString()
  @IsOptional()
  headerIntroText?: string;

  @IsArray()
  @IsOptional()
  sections?: any[];
}
