// christopher Esguerra userroutes.js
import express from 'express';
const router = express.Router();
import User from '../models/user.js';

///Referencing https://mongoosejs.com/docs/api/model.html

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ created: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body); // Ensure req.body matches UserSchema
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE user
router.put('/:id', async (req, res) => {
  try {
    // Optionally set updated if you want to control it manually:
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// DELETE users
router.delete('/', async (req, res) => {
  try {
    const deletedUsers = await User.deleteMany();
    if (deletedUsers.deletedCount === 0) return res.status(404).json({ error: 'No users found' });
    res.json({ message: 'Users deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;