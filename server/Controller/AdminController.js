const Admin = require('../models-mysql/Admin');

const getCredentials = async (req, res) => {
  try {
    const admin = await Admin.findOne(); // fetch first admin record

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const credentials = {
      username: admin.email,
      password: admin.password
    };

    res.status(200).json(credentials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getCredentials };