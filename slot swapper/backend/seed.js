require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Event = require('./models/Event');
const SwapRequest = require('./models/SwapRequest');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Event.deleteMany({});
    await SwapRequest.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = await User.create([
      { name: 'Emily Carter', email: 'emily@example.com', password: hashedPassword },
      { name: 'David Lee', email: 'david@example.com', password: hashedPassword },
      { name: 'Sarah Chen', email: 'sarah@example.com', password: hashedPassword },
      { name: 'User A', email: 'usera@example.com', password: hashedPassword },
      { name: 'User B', email: 'userb@example.com', password: hashedPassword },
      { name: 'User C', email: 'userc@example.com', password: hashedPassword },
      { name: 'User D', email: 'userd@example.com', password: hashedPassword },
      { name: 'Olivia Rodriguez', email: 'olivia@example.com', password: hashedPassword },
      { name: 'Michael Johnson', email: 'michael@example.com', password: hashedPassword }
    ]);

    console.log('Created users:', users.map(u => u.email));

    // Helper to create dates
    const getDate = (daysOffset, hour, minute = 0) => {
      const date = new Date();
      date.setDate(date.getDate() + daysOffset);
      date.setHours(hour, minute, 0, 0);
      return date;
    };

    // Create events for each user
    const events = [];

    // User 0 (Emily) - The main test user
    events.push(
      { title: 'Project Meeting', startTime: getDate(0, 10, 0), endTime: getDate(0, 11, 0), location: 'Conference Room A', status: 'BUSY', userId: users[0]._id },
      { title: 'Client Presentation', startTime: getDate(0, 13, 0), endTime: getDate(0, 14, 30), location: 'Boardroom', status: 'SWAPPABLE', userId: users[0]._id },
      { title: 'Team Lunch', startTime: getDate(0, 12, 0), endTime: getDate(0, 13, 0), location: 'Cafeteria', status: 'SWAPPABLE', userId: users[0]._id },
      { title: 'Training Session', startTime: getDate(0, 15, 0), endTime: getDate(0, 16, 0), location: 'Training Room', status: 'SWAPPABLE', userId: users[0]._id },
      { title: 'Review Meeting', startTime: getDate(0, 16, 30), endTime: getDate(0, 17, 30), location: 'Office', status: 'BUSY', userId: users[0]._id },
      { title: 'Weekly Standup', startTime: getDate(1, 10, 0), endTime: getDate(1, 11, 0), location: 'Conference Room A', status: 'BUSY', userId: users[0]._id }
    );

    // User 1 (David) - Has swappable slots
    events.push(
      { title: 'Morning Yoga Session', startTime: getDate(0, 10, 0), endTime: getDate(0, 11, 0), location: 'Gym', status: 'SWAPPABLE', userId: users[1]._id },
      { title: 'Afternoon Coding Workshop', startTime: getDate(0, 14, 0), endTime: getDate(0, 15, 0), location: 'Lab', status: 'SWAPPABLE', userId: users[1]._id },
      { title: 'Design Review', startTime: getDate(1, 9, 0), endTime: getDate(1, 10, 0), location: 'Studio', status: 'SWAPPABLE', userId: users[1]._id }
    );

    // User 2 (Sarah) - Has swappable slots
    events.push(
      { title: 'Early Bird Meditation', startTime: getDate(1, 9, 0), endTime: getDate(1, 10, 0), location: 'Meditation Hall', status: 'SWAPPABLE', userId: users[2]._id },
      { title: 'Lunchtime Language Exchange', startTime: getDate(1, 13, 0), endTime: getDate(1, 14, 0), location: 'Lounge', status: 'SWAPPABLE', userId: users[2]._id },
      { title: 'Evening Book Club', startTime: getDate(1, 18, 0), endTime: getDate(1, 19, 0), location: 'Library', status: 'SWAPPABLE', userId: users[2]._id }
    );

    // User 3 (User A)
    events.push(
      { title: 'Backend Sprint Planning', startTime: getDate(0, 11, 0), endTime: getDate(0, 12, 0), location: 'Room 301', status: 'SWAPPABLE', userId: users[3]._id },
      { title: 'API Development Workshop', startTime: getDate(1, 14, 0), endTime: getDate(1, 15, 0), location: 'Tech Lab', status: 'SWAPPABLE', userId: users[3]._id }
    );

    // User 4 (User B)
    events.push(
      { title: 'UI/UX Design Session', startTime: getDate(0, 15, 0), endTime: getDate(0, 16, 0), location: 'Design Studio', status: 'SWAPPABLE', userId: users[4]._id },
      { title: 'Frontend Code Review', startTime: getDate(1, 10, 0), endTime: getDate(1, 11, 0), location: 'Meeting Room B', status: 'SWAPPABLE', userId: users[4]._id }
    );

    // User 5 (User C)
    events.push(
      { title: 'Database Optimization Talk', startTime: getDate(0, 9, 0), endTime: getDate(0, 10, 0), location: 'Auditorium', status: 'SWAPPABLE', userId: users[5]._id },
      { title: 'DevOps Best Practices', startTime: getDate(1, 16, 0), endTime: getDate(1, 17, 0), location: 'Conference Hall', status: 'SWAPPABLE', userId: users[5]._id }
    );

    // User 6 (User D)
    events.push(
      { title: 'Security Audit Meeting', startTime: getDate(0, 14, 0), endTime: getDate(0, 15, 0), location: 'Secure Room', status: 'SWAPPABLE', userId: users[6]._id }
    );

    // User 7 (Olivia)
    events.push(
      { title: 'Product Strategy Session', startTime: getDate(1, 11, 0), endTime: getDate(1, 12, 0), location: 'Board Room', status: 'SWAPPABLE', userId: users[7]._id }
    );

    // User 8 (Michael)
    events.push(
      { title: 'Customer Success Workshop', startTime: getDate(0, 16, 0), endTime: getDate(0, 17, 0), location: 'Training Center', status: 'SWAPPABLE', userId: users[8]._id }
    );

    await Event.insertMany(events);
    console.log('Created events:', events.length);

    // Create some swap requests
    const createdEvents = await Event.find();
    const emilyEvents = createdEvents.filter(e => e.userId.toString() === users[0]._id.toString());
    const otherSwappableEvents = createdEvents.filter(e => 
      e.userId.toString() !== users[0]._id.toString() && 
      e.status === 'SWAPPABLE'
    );

    if (emilyEvents.length > 0 && otherSwappableEvents.length > 1) {
      const emilySwappableSlot = emilyEvents.find(e => e.status === 'SWAPPABLE')?._id || emilyEvents[0]._id;
      
      // Create incoming requests for Emily (people wanting to swap with Emily)
      await SwapRequest.create([
        {
          requesterId: users[1]._id, // David Lee
          requesterSlotId: otherSwappableEvents[0]._id,
          targetUserId: users[0]._id, // Emily
          targetSlotId: emilySwappableSlot,
          status: 'PENDING'
        },
        {
          requesterId: users[2]._id, // Sarah Chen
          requesterSlotId: otherSwappableEvents[1]._id,
          targetUserId: users[0]._id, // Emily
          targetSlotId: emilySwappableSlot,
          status: 'PENDING'
        },
        {
          requesterId: users[1]._id, // David Lee (another request)
          requesterSlotId: otherSwappableEvents[2]._id,
          targetUserId: users[0]._id, // Emily
          targetSlotId: emilySwappableSlot,
          status: 'PENDING'
        }
      ]);

      // Create outgoing requests from Emily (Emily requesting swaps from others)
      if (otherSwappableEvents.length > 5) {
        await SwapRequest.create([
          {
            requesterId: users[0]._id, // Emily
            requesterSlotId: emilySwappableSlot,
            targetUserId: users[8]._id, // Michael Johnson
            targetSlotId: otherSwappableEvents[10]._id,
            status: 'PENDING'
          },
          {
            requesterId: users[0]._id, // Emily
            requesterSlotId: emilySwappableSlot,
            targetUserId: users[7]._id, // Olivia Rodriguez
            targetSlotId: otherSwappableEvents[11]._id,
            status: 'PENDING'
          }
        ]);
      }

      console.log('Created swap requests (incoming & outgoing)');
    }

    console.log('\n=== SEED DATA COMPLETE ===');
    console.log('Login credentials:');
    console.log('Email: emily@example.com');
    console.log('Password: password123');
    console.log('\nOther test users:');
    console.log('david@example.com, sarah@example.com, etc.');
    console.log('All passwords: password123');

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
