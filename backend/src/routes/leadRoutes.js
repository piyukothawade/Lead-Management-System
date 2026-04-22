const express = require('express');
const router = express.Router();

const controller = require('../controllers/lead.controller');
const validateLead = require('../middleware/validateLead');

// CRUD
router.post('/', validateLead, controller.createLead);
router.get('/', controller.getLeads);
router.get('/dashboard/stats', controller.getDashboardStats);
router.get('/:id', controller.getLeadById);
router.put('/:id', controller.updateLead);
router.delete('/:id', controller.deleteLead);

// Notes
router.post('/:id/notes', controller.addNote);

module.exports = router;