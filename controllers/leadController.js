import Lead from '../models/Lead.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/apiResponse.js';

// --- PUBLIC: SUBMIT A NEW LEAD (From Next.js Form) ---
export const createLead = catchAsync(async (req, res, next) => {
  // We explicitly map the fields so customers can't accidentally (or maliciously) 
  // send { "status": "Converted" } in their initial form payload.
  const leadData = {
    serviceRequested: req.body.serviceRequested,
    customerName: req.body.customerName,
    customerEmail: req.body.customerEmail,
    customerPhone: req.body.customerPhone,
    originCity: req.body.originCity,
    destinationCity: req.body.destinationCity,
    shiftingDate: req.body.shiftingDate,
    customerComment: req.body.customerComment,
    customFields: req.body.customFields // This catches the dynamic dropdowns!
  };

  const newLead = await Lead.create(leadData);

  // 2. Create a customer-friendly Order ID using the last 6 characters of the MongoDB ID
  const shortId = newLead._id.toString().slice(-6).toUpperCase();
  const customerOrderId = `PRADHAN-${shortId}`;

  // 3. Send the data back!
  res.status(201).json({
    success: true,
    message: "Quote request submitted successfully. Our team will contact you shortly.",
    data: {
      orderId: customerOrderId,  // Show this to the customer on the Next.js "Thank You" page
      leadId: newLead._id        // Keep this hidden in the background for your API updates
    }
  });
});

// --- ADMIN: GET ALL LEADS (With Filtering & Sorting) ---
export const getAllLeads = catchAsync(async (req, res, next) => {
  // Build a dynamic filter based on what the Vite dashboard asks for
  let queryObj = {};

  if (req.query.status) queryObj.status = req.query.status; // e.g., ?status=New
  if (req.query.service) queryObj.serviceRequested = req.query.service;
  if (req.query.city) queryObj.originCity = req.query.city;

  // Find the leads and sort them by newest first
  const leads = await Lead.find(queryObj).sort({ createdAt: -1 });

  successResponse(res, 200, 'Leads retrieved', { 
    count: leads.length, 
    leads 
  });
});

// --- ADMIN: GET SINGLE LEAD DETAILS ---
export const getLeadById = catchAsync(async (req, res, next) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    return next(new AppError('No lead found with that ID', 404));
  }

  successResponse(res, 200, 'Lead details retrieved', { lead });
});

// --- ADMIN: UPDATE LEAD STATUS & NOTES (The Pipeline) ---
export const updateLead = catchAsync(async (req, res, next) => {
  // Sales agents should only be allowed to update the status and admin notes.
  // We shouldn't let them accidentally change the customer's phone number here.
  const allowedUpdates = {
    status: req.body.status,
    adminNotes: req.body.adminNotes
  };

  // Remove undefined fields so we don't accidentally wipe existing notes
  Object.keys(allowedUpdates).forEach(key => 
    allowedUpdates[key] === undefined && delete allowedUpdates[key]
  );

  const updatedLead = await Lead.findByIdAndUpdate(
    req.params.id, 
    allowedUpdates, 
    { new: true, runValidators: true }
  );

  if (!updatedLead) {
    return next(new AppError('No lead found with that ID', 404));
  }

  successResponse(res, 200, 'Lead updated successfully', { lead: updatedLead });
});

// --- ADMIN: DELETE A LEAD ---
export const deleteLead = catchAsync(async (req, res, next) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);

  if (!lead) {
    return next(new AppError('No lead found with that ID', 404));
  }

  // FIX: Changed status from 204 to 200 so the JSON body is successfully sent to the frontend!
  res.status(200).json({
    success: true,
    message: 'Lead permanently deleted.'
  });
});