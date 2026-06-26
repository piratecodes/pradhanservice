import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { LeadService } from './lead.service';
import { CreateLeadDto, UpdateLeadDto } from './dto/lead.dto';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';

@Controller('leads')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createLead(@Body() dto: CreateLeadDto) {
    const lead = await this.leadService.createLead(dto);
    const shortId = String(lead.id).padStart(6, '0');
    const customerOrderId = `PRADHAN-${shortId}`;

    return { 
      success: true, 
      message: 'Quote request submitted successfully. Our team will contact you shortly.', 
      data: { orderId: customerOrderId, leadId: lead.id } 
    };
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  async getAllLeads(@Query('status') status: string, @Query('service') service: string, @Query('city') city: string) {
    const leads = await this.leadService.getAllLeads(status, service, city);
    return { success: true, message: 'Leads retrieved', data: { count: leads.length, leads } };
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  async getLeadById(@Param('id') id: string) {
    const lead = await this.leadService.getLeadById(+id);
    return { success: true, message: 'Lead details retrieved', data: { lead } };
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  async updateLead(@Param('id') id: string, @Body() dto: UpdateLeadDto) {
    console.log("Data:", dto)
    const lead = await this.leadService.updateLead(+id, dto);
    return { success: true, message: 'Lead updated successfully', data: { lead } };
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  async deleteLead(@Param('id') id: string) {
    await this.leadService.deleteLead(+id);
    return { success: true, message: 'Lead permanently deleted.', data: null };
  }
}
