const Lead = require('../models/leadModel');
const asyncHandler = require('express-async-handler');

// CREATE
exports.createLead = asyncHandler(async (req, res) => {
  const lead = await Lead.create(req.body);
  res.status(201).json(lead);
});

// GET ALL + SEARCH + FILTER + SORT
exports.getLeads = asyncHandler(async (req, res) => {
  const { search, source, status, sortBy } = req.query;

  let query = {};

  if (search) {
    query.$or = [
      { name: new RegExp(search, 'i') },
      { phone: new RegExp(search, 'i') }
    ];
  }

  if (source) query.source = source;
  if (status) query.status = status;

  let leads = Lead.find(query);

  if (sortBy === 'budget') leads = leads.sort({ budget: 1 });
  else leads = leads.sort({ createdAt: -1 });

  const result = await leads;
  res.json(result);
});

// GET SINGLE
exports.getLeadById = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) {
    res.status(404);
    throw new Error("Lead not found");
  }
  res.json(lead);
});

// UPDATE
exports.updateLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(lead);
});

// DELETE
exports.deleteLead = asyncHandler(async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ message: 'Lead deleted' });
});

// ADD NOTE
exports.addNote = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  lead.notes.push({ text: req.body.text });
  await lead.save();

  res.json(lead);
});

// DASHBOARD
exports.getDashboardStats = asyncHandler(async (req, res) => {
  const totalLeads = await Lead.countDocuments();

  const leadsBySource = await Lead.aggregate([
    { $group: { _id: "$source", count: { $sum: 1 } } }
  ]);

  const statusDistribution = await Lead.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);

  const closedLeads = await Lead.countDocuments({ status: "Closed" });

  const conversionRate = totalLeads
    ? ((closedLeads / totalLeads) * 100).toFixed(2)
    : 0;

  res.json({
    totalLeads,
    leadsBySource,
    statusDistribution,
    conversionRate
  });
});