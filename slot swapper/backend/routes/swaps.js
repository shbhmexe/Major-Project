const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const SwapRequest = require('../models/SwapRequest');
const { protect } = require('../middleware/auth');
const mongoose = require('mongoose');

// @route   GET /api/swaps/swappable-slots
// @desc    Get all swappable slots from other users
// @access  Private
router.get('/swappable-slots', protect, async (req, res) => {
  try {
    const swappableSlots = await Event.find({
      status: 'SWAPPABLE',
      userId: { $ne: req.user._id }
    })
      .populate('userId', 'name email')
      .sort({ startTime: 1 });

    res.json(swappableSlots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/swaps/swap-request
// @desc    Create a swap request
// @access  Private
router.post('/swap-request', protect, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { mySlotId, theirSlotId } = req.body;

    // Validation
    if (!mySlotId || !theirSlotId) {
      await session.abortTransaction();
      return res.status(400).json({ message: 'Please provide both slot IDs' });
    }

    // Check if both slots exist
    const mySlot = await Event.findById(mySlotId).session(session);
    const theirSlot = await Event.findById(theirSlotId).session(session);

    if (!mySlot || !theirSlot) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'One or both slots not found' });
    }

    // Verify ownership of mySlot
    if (mySlot.userId.toString() !== req.user._id.toString()) {
      await session.abortTransaction();
      return res.status(403).json({ message: 'You do not own the slot you are offering' });
    }

    // Verify both slots are SWAPPABLE
    if (mySlot.status !== 'SWAPPABLE') {
      await session.abortTransaction();
      return res.status(400).json({ message: 'Your slot is not swappable' });
    }

    if (theirSlot.status !== 'SWAPPABLE') {
      await session.abortTransaction();
      return res.status(400).json({ message: 'The requested slot is not swappable' });
    }

    // Check if user is trying to swap with their own slot
    if (theirSlot.userId.toString() === req.user._id.toString()) {
      await session.abortTransaction();
      return res.status(400).json({ message: 'Cannot swap with your own slot' });
    }

    // Create swap request
    const swapRequest = await SwapRequest.create([{
      requesterId: req.user._id,
      requesterSlotId: mySlotId,
      targetUserId: theirSlot.userId,
      targetSlotId: theirSlotId,
      status: 'PENDING'
    }], { session });

    // Update both slots to SWAP_PENDING
    mySlot.status = 'SWAP_PENDING';
    theirSlot.status = 'SWAP_PENDING';

    await mySlot.save({ session });
    await theirSlot.save({ session });

    await session.commitTransaction();

    const populatedSwapRequest = await SwapRequest.findById(swapRequest[0]._id)
      .populate('requesterId', 'name email')
      .populate('requesterSlotId')
      .populate('targetUserId', 'name email')
      .populate('targetSlotId');

    // Send real-time notification to target user
    const io = req.app.get('io');
    io.to(theirSlot.userId.toString()).emit('newSwapRequest', {
      message: `${req.user.name} wants to swap with you!`,
      request: populatedSwapRequest
    });

    res.status(201).json(populatedSwapRequest);
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  } finally {
    session.endSession();
  }
});

// @route   POST /api/swaps/swap-response/:requestId
// @desc    Accept or reject a swap request
// @access  Private
router.post('/swap-response/:requestId', protect, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { accept } = req.body;

    if (accept === undefined) {
      await session.abortTransaction();
      return res.status(400).json({ message: 'Please specify accept (true/false)' });
    }

    const swapRequest = await SwapRequest.findById(req.params.requestId).session(session);

    if (!swapRequest) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Swap request not found' });
    }

    // Verify that the user is the target of the swap request
    if (swapRequest.targetUserId.toString() !== req.user._id.toString()) {
      await session.abortTransaction();
      return res.status(403).json({ message: 'Not authorized to respond to this swap request' });
    }

    // Check if request is still pending
    if (swapRequest.status !== 'PENDING') {
      await session.abortTransaction();
      return res.status(400).json({ message: 'This swap request has already been processed' });
    }

    const requesterSlot = await Event.findById(swapRequest.requesterSlotId).session(session);
    const targetSlot = await Event.findById(swapRequest.targetSlotId).session(session);

    if (!requesterSlot || !targetSlot) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'One or both slots not found' });
    }

    if (accept) {
      // ACCEPT: Swap the owners and set status back to BUSY
      swapRequest.status = 'ACCEPTED';

      const tempUserId = requesterSlot.userId;
      requesterSlot.userId = targetSlot.userId;
      targetSlot.userId = tempUserId;

      requesterSlot.status = 'BUSY';
      targetSlot.status = 'BUSY';

      await requesterSlot.save({ session });
      await targetSlot.save({ session });
    } else {
      // REJECT: Set status back to SWAPPABLE
      swapRequest.status = 'REJECTED';

      requesterSlot.status = 'SWAPPABLE';
      targetSlot.status = 'SWAPPABLE';

      await requesterSlot.save({ session });
      await targetSlot.save({ session });
    }

    await swapRequest.save({ session });
    await session.commitTransaction();

    const populatedSwapRequest = await SwapRequest.findById(swapRequest._id)
      .populate('requesterId', 'name email')
      .populate('requesterSlotId')
      .populate('targetUserId', 'name email')
      .populate('targetSlotId');

    // Send real-time notification to requester
    const io = req.app.get('io');
    const message = accept ? 'Your swap request was accepted!' : 'Your swap request was rejected.';
    io.to(swapRequest.requesterId.toString()).emit('swapResponse', {
      message,
      accepted: accept,
      request: populatedSwapRequest
    });

    res.json(populatedSwapRequest);
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  } finally {
    session.endSession();
  }
});

// @route   GET /api/swaps/requests
// @desc    Get all swap requests (incoming and outgoing) for the logged-in user
// @access  Private
router.get('/requests', protect, async (req, res) => {
  try {
    // Incoming requests - requests where user is the target
    const incomingRequests = await SwapRequest.find({
      targetUserId: req.user._id,
      status: 'PENDING'
    })
      .populate('requesterId', 'name email')
      .populate('requesterSlotId')
      .populate('targetUserId', 'name email')
      .populate('targetSlotId')
      .sort({ createdAt: -1 });

    // Outgoing requests - requests where user is the requester
    const outgoingRequests = await SwapRequest.find({
      requesterId: req.user._id
    })
      .populate('requesterId', 'name email')
      .populate('requesterSlotId')
      .populate('targetUserId', 'name email')
      .populate('targetSlotId')
      .sort({ createdAt: -1 });

    res.json({
      incoming: incomingRequests,
      outgoing: outgoingRequests
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
