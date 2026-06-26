import { IsString, IsEmail, IsNotEmpty, IsOptional, IsObject, IsEnum, IsDateString } from 'class-validator';
import { LeadStatus } from '@prisma/client';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  serviceRequested: string;

  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsEmail()
  @IsNotEmpty()
  customerEmail: string;

  @IsString()
  @IsNotEmpty()
  customerPhone: string;

  @IsString()
  @IsNotEmpty()
  originCity: string;

  @IsString()
  @IsOptional()
  destinationCity?: string;

  @IsDateString()
  @IsOptional()
  shiftingDate?: string;

  @IsString()
  @IsOptional()
  customerComment?: string;

  @IsObject()
  @IsOptional()
  customFields?: Record<string, string>;
}

export class UpdateLeadDto {
  @IsOptional()
  @IsEnum(LeadStatus)
  status?: LeadStatus;

  @IsString()
  @IsOptional()
  adminNotes?: string;
}
