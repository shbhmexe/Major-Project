require('dotenv').config();
const mongoose = require('mongoose');
const SwapRequest = require('./models/SwapRequest');
const User = require('./models/User');
const Event = require('./models/Event');

const checkRequests = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    // Find Emily
    const emily = await User.findOne({ email: 'emily@example.com' });
    if (!emily) {
      console.log('Emily not found!');
      return;
    }
    console.log('Emily ID:', emily._id);
    console.log('Emily Name:', emily.name);

    // Find incoming requests
    const incoming = await SwapRequest.find({
      targetUserId: emily._id,
      status: 'PENDING'
    })
      .populate('requesterId', 'name email')
      .populate('requesterSlotId')
      .populate('targetUserId', 'name email')
      .populate('targetSlotId');

    console.log('\n=== INCOMING REQUESTS ===');
    console.log('Count:', incoming.length);
    incoming.forEach((req, i) => {
      console.log(`\n${i + 1}. From: ${req.requesterId?.name}`);
      console.log(`   Their Slot: ${req.requesterSlotId?.title}`);
      console.log(`   Your Slot: ${req.targetSlotId?.title}`);
      console.log(`   Status: ${req.status}`);
    });

    // Find outgoing requests
    const outgoing = await SwapRequest.find({
      requesterId: emily._id
    })
      .populate('requesterId', 'name email')
      .populate('requesterSlotId')
      .populate('targetUserId', 'name email')
      .populate('targetSlotId');

    console.log('\n=== OUTGOING REQUESTS ===');
    console.log('Count:', outgoing.length);
    outgoing.forEach((req, i) => {
      console.log(`\n${i + 1}. To: ${req.targetUserId?.name}`);
      console.log(`   Your Slot: ${req.requesterSlotId?.title}`);
      console.log(`   Their Slot: ${req.targetSlotId?.title}`);
      console.log(`   Status: ${req.status}`);
    });

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
};

checkRequests();
