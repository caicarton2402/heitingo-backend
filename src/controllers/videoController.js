const Video = require('../models/Video');
const User = require('../models/User');

exports.getFeed = async (req, res) => {
  try {
    const videos = await Video.findAll({
      where: { status: 1 },
      order: [['created_at', 'DESC']],
      limit: 10
    });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.likeVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findByPk(id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    
    video.likes_count += 1;
    await video.save();
    res.json({ message: 'Video liked', likes: video.likes_count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
