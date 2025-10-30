const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { protect } = require('../middleware/auth');

// @route   GET /api/events
// @desc    Get all events for logged in user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user._id }).sort({ startTime: 1 });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/events
// @desc    Create new event
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { title, startTime, endTime, location, status } = req.body;

    // Validation
    if (!title || !startTime || !endTime) {
      return res.status(400).json({ message: 'Please provide title, start time, and end time' });
    }

    // Check if end time is after start time
    if (new Date(endTime) <= new Date(startTime)) {
      return res.status(400).json({ message: 'End time must be after start time' });
    }

    const event = await Event.create({
      title,
      startTime,
      endTime,
      location: location || '',
      status: status || 'BUSY',
      userId: req.user._id
    });

    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/events/:id
// @desc    Update event
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user owns the event
    if (event.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }

    // Prevent updating if event is in SWAP_PENDING state
    if (event.status === 'SWAP_PENDING' && req.body.status !== 'SWAP_PENDING') {
      return res.status(400).json({ message: 'Cannot update event with pending swap' });
    }

    const { title, startTime, endTime, location, status } = req.body;

    event.title = title || event.title;
    event.startTime = startTime || event.startTime;
    event.endTime = endTime || event.endTime;
    event.location = location !== undefined ? location : event.location;
    event.status = status || event.status;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete event
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user owns the event
    if (event.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }

    // Prevent deletion if event is in SWAP_PENDING state
    if (event.status === 'SWAP_PENDING') {
      return res.status(400).json({ message: 'Cannot delete event with pending swap' });
    }

    await Event.deleteOne({ _id: req.params.id });
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
