const Celebrity = require('../models/Celebrity');
const User = require('../models/User');

exports.listTalents = async (req, res) => {
  try {
    const talents = await Celebrity.findAll({
      include: [{
        model: User,
        attributes: ['nickname', 'avatar', 'level']
      }]
    });
    res.json(talents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getJumpLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { userLevel } = req.query; // Level passed from client
    
    const talent = await Celebrity.findByPk(id);
    if (!talent) return res.status(404).json({ message: 'Talent not found' });

    // Business Logic: Return link based on user level
    const links = talent.external_links; // e.g., { "1": "link1", "vip": "link2" }
    const targetLink = links[userLevel] || links['default'];
    
    res.json({ url: targetLink });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
