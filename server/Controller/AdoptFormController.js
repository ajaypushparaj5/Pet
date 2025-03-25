const AdoptForm = require('../models-mysql/AdoptionRequest');

// Save adoption form
const saveForm = async (req, res) => {
  try {
    const {
      email,
      livingSituation,
      phoneNo,
      previousExperience,
      familyComposition,
      petId
    } = req.body;

    const form = await AdoptForm.create({
      userEmail: email,
      livingSituation,
      userPhone: phoneNo,
      previousExperience,
      familyComposition,
      petId,
      status: 'Pending'
    });

    res.status(200).json(form);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all adoption forms
const getAdoptForms = async (req, res) => {
  try {
    const forms = await AdoptForm.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(forms);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete one adoption form by ID
const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await AdoptForm.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json({ message: 'Form deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete all adoption requests by pet ID
const deleteAllRequests = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await AdoptForm.destroy({ where: { petId: id } });

    if (result === 0) {
      return res.status(404).json({ error: 'Forms not found' });
    }

    res.status(200).json({ message: 'Forms deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  saveForm,
  getAdoptForms,
  deleteForm,
  deleteAllRequests
};