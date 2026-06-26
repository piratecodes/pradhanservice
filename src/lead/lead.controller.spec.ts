import { Test, TestingModule } from '@nestjs/testing';
import { LeadController } from './lead.controller';
import { LeadService } from './lead.service';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { CreateLeadDto, UpdateLeadDto } from './dto/lead.dto';
import { ExecutionContext } from '@nestjs/common';

describe('LeadController', () => {
  let controller: LeadController;
  let service: LeadService;

  const mockLeadService = {
    createLead: jest.fn(),
    getAllLeads: jest.fn(),
    getLeadById: jest.fn(),
    updateLead: jest.fn(),
    deleteLead: jest.fn(),
  };

  const mockGuard = {
    canActivate: (context: ExecutionContext) => true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadController],
      providers: [
        { provide: LeadService, useValue: mockLeadService },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockGuard)
      .overrideGuard(RolesGuard)
      .useValue(mockGuard)
      .compile();

    controller = module.get<LeadController>(LeadController);
    service = module.get<LeadService>(LeadService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createLead', () => {
    it('should submit quotes and return formatted Order ID', async () => {
      const dto: CreateLeadDto = {
        customerName: 'Cust',
        customerEmail: 'c@c.com',
        customerPhone: '123',
        originCity: 'Kolkata',
        destinationCity: 'Delhi',
        serviceRequested: 'shifting',
        shiftingDate: '2026-06-15',
      };
      const created = { id: 7, ...dto };
      mockLeadService.createLead.mockResolvedValueOnce(created);

      const res = await controller.createLead(dto);
      expect(res).toEqual({
        success: true,
        message: 'Quote request submitted successfully. Our team will contact you shortly.',
        data: { orderId: 'PRADHAN-000007', leadId: 7 },
      });
      expect(mockLeadService.createLead).toHaveBeenCalledWith(dto);
    });
  });

  describe('getAllLeads', () => {
    it('should retrieve leads matching filters', async () => {
      const leads = [{ id: 1, name: 'Cust' }];
      mockLeadService.getAllLeads.mockResolvedValueOnce(leads);

      const res = await controller.getAllLeads('NEW', 'shifting', 'Kolkata');
      expect(res).toEqual({
        success: true,
        message: 'Leads retrieved',
        data: { count: 1, leads },
      });
      expect(mockLeadService.getAllLeads).toHaveBeenCalledWith('NEW', 'shifting', 'Kolkata');
    });
  });

  describe('getLeadById', () => {
    it('should retrieve lead by id', async () => {
      const lead = { id: 1, name: 'Cust' };
      mockLeadService.getLeadById.mockResolvedValueOnce(lead);

      const res = await controller.getLeadById('1');
      expect(res).toEqual({
        success: true,
        message: 'Lead details retrieved',
        data: { lead },
      });
      expect(mockLeadService.getLeadById).toHaveBeenCalledWith(1);
    });
  });

  describe('updateLead', () => {
    it('should update lead successfully', async () => {
      const dto: UpdateLeadDto = { status: 'CONTACTED' };
      const updated = { id: 1, status: 'CONTACTED' };
      mockLeadService.updateLead.mockResolvedValueOnce(updated);

      const res = await controller.updateLead('1', dto);
      expect(res).toEqual({
        success: true,
        message: 'Lead updated successfully',
        data: { lead: updated },
      });
      expect(mockLeadService.updateLead).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('deleteLead', () => {
    it('should delete lead successfully', async () => {
      mockLeadService.deleteLead.mockResolvedValueOnce(true);

      const res = await controller.deleteLead('1');
      expect(res).toEqual({
        success: true,
        message: 'Lead permanently deleted.',
        data: null,
      });
      expect(mockLeadService.deleteLead).toHaveBeenCalledWith(1);
    });
  });
});
