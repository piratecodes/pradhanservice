import express from 'express';
import {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead
} from '../controllers/leadController.js';
import { protect } from '../controllers/authController.js';

const router = express.Router();

// --- PUBLIC ROUTE (For your Next.js form componant) ---
// Anyone on the internet can submit a quote request
router.post('/', createLead);

// 🛡️ SECURITY CHECKPOINT: Everything below requires Staff access
router.use(protect);

// --- ADMIN & SALES ROUTES (For your Vite dashboard) ---
// Notice we don't use restrictTo() here, because regular sales-agents NEED to see this!
router.get('/', getAllLeads);
router.get('/:id', getLeadById);
router.patch('/:id', updateLead); // Sales agents updating the pipeline status
router.delete('/:id', deleteLead);

export default router;