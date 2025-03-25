const Pet = require('../models-mysql/Pet');
const fs = require('fs');
const path = require('path');

const postPetRequest = async (req, res) => {
  try {
    const { name, age, area, justification, email, phone, type } = req.body;
    const { filename } = req.file;

    const pet = await Pet.create({
      name,
      age,
      area,
      justification,
      email,
      phone,
      type,
      image: filename, // Sequelize model uses 'image' field
      status: 'Pending'
    });

    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const approveRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const { email, phone, status } = req.body;

    const [updated] = await Pet.update(
      { email, phone, status },
      { where: { id } }
    );

    if (updated === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    const updatedPet = await Pet.findByPk(id);
    res.status(200).json(updatedPet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const allPets = async (reqStatus, req, res) => {
  try {
    const pets = await Pet.findAll({
      where: { status: reqStatus },
      order: [['updatedAt', 'DESC']]
    });

    if (pets.length > 0) {
      res.status(200).json(pets);
    } else {
      res.status(404).json({ error: 'No data found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    const pet = await Pet.findByPk(id);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    const filePath = path.join(__dirname, '../images', pet.image);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Pet.destroy({ where: { id } });
    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  postPetRequest,
  approveRequest,
  deletePost,
  allPets
};