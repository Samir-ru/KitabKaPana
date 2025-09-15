const router = require('express').Router();
const User = require('../models/User');
const Kitab = require('../models/Kitab');
const { auth } = require('../middleware/auth');
const { isAdmin } = require('../middleware/admin');

// Get all users (admin only)
router.get('/users', auth, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password -refreshToken');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user role (admin only)
router.patch('/users/:userId/role', auth, isAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    if (!role || !['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { role },
      { new: true }
    ).select('-password -refreshToken');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new kitab (admin only)
router.post('/kitabs', auth, isAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const kitab = new Kitab({
      name,
      description,
      createdBy: req.user._id
    });

    await kitab.save();
    res.status(201).json(kitab);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'A kitab with this name already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Get all kitabs
router.get('/kitabs', auth, async (req, res) => {
  try {
    const kitabs = await Kitab.find({ isActive: true });
    res.json(kitabs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update kitab (admin only)
router.patch('/kitabs/:id', auth, isAdmin, async (req, res) => {
  try {
    const { name, description, isActive } = req.body;
    const kitab = await Kitab.findByIdAndUpdate(
      req.params.id,
      { name, description, isActive },
      { new: true }
    );

    if (!kitab) {
      return res.status(404).json({ error: 'Kitab not found' });
    }

    res.json(kitab);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;