import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  cityName: string;

  @IsString()
  @IsNotEmpty()
  citySlug: string;

  @IsArray()
  @IsOptional()
  activeServices?: string[];

  @IsArray()
  @IsOptional()
  subTowns?: string[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateCityDto {
  @IsString()
  @IsOptional()
  cityName?: string;

  @IsString()
  @IsOptional()
  citySlug?: string;

  @IsArray()
  @IsOptional()
  activeServices?: string[];

  @IsArray()
  @IsOptional()
  subTowns?: string[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
