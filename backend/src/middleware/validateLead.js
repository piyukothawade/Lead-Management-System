const validateLead = (req, res, next) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({
      message: "Name and Phone are required"
    });
  }

  next();
};

module.exports = validateLead;