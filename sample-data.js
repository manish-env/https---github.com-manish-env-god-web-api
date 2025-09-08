const { Project, initDatabase } = require('./models');

// Sample projects data
const sampleProjects = [
  {
    name: 'Modern Living Room Design',
    type: 'Residential',
    location: 'Mumbai, India',
    clientName: 'Rajesh Kumar',
    area: '1200',
    status: 'Completed',
    description: 'A contemporary living room design with clean lines and modern furniture.',
    photos: ['living-room-1.jpg', 'living-room-2.jpg', 'living-room-3.jpg'],
    priority: '1'
  },
  {
    name: 'Corporate Office Space',
    type: 'Commercial',
    location: 'Delhi, India',
    clientName: 'TechCorp Solutions',
    area: '5000',
    status: 'Completed',
    description: 'Modern office design with open workspace and meeting rooms.',
    photos: ['office-1.jpg', 'office-2.jpg', 'office-3.jpg'],
    priority: '2'
  },
  {
    name: 'Luxury Bedroom Suite',
    type: 'Residential',
    location: 'Bangalore, India',
    clientName: 'Priya Sharma',
    area: '800',
    status: 'Completed',
    description: 'Elegant bedroom design with premium finishes and custom furniture.',
    photos: ['bedroom-1.jpg', 'bedroom-2.jpg'],
    priority: '3'
  },
  {
    name: 'Restaurant Interior',
    type: 'Commercial',
    location: 'Pune, India',
    clientName: 'Spice Garden Restaurant',
    area: '2000',
    status: 'Completed',
    description: 'Warm and inviting restaurant design with traditional Indian elements.',
    photos: ['restaurant-1.jpg', 'restaurant-2.jpg', 'restaurant-3.jpg'],
    priority: '4'
  },
  {
    name: 'Kitchen Renovation',
    type: 'Residential',
    location: 'Chennai, India',
    clientName: 'Vikram Reddy',
    area: '600',
    status: 'Completed',
    description: 'Modern kitchen with island counter and premium appliances.',
    photos: ['kitchen-1.jpg', 'kitchen-2.jpg'],
    priority: '5'
  },
  {
    name: 'Hotel Lobby Design',
    type: 'Commercial',
    location: 'Goa, India',
    clientName: 'Beach Resort Goa',
    area: '3000',
    status: 'Completed',
    description: 'Luxurious hotel lobby with tropical theme and natural materials.',
    photos: ['hotel-1.jpg', 'hotel-2.jpg', 'hotel-3.jpg'],
    priority: '6'
  }
];

// Function to add sample data
const addSampleData = async () => {
  try {
    console.log('🚀 Initializing database...');
    await initDatabase();
    
    console.log('📊 Checking existing projects...');
    const existingProjects = await Project.findAll();
    console.log(`Found ${existingProjects.length} existing projects`);
    
    if (existingProjects.length === 0) {
      console.log('📝 Adding sample projects...');
      await Project.bulkCreate(sampleProjects);
      console.log('✅ Sample projects added successfully!');
    } else {
      console.log('ℹ️  Database already has projects, skipping sample data');
    }
    
    // Display all projects
    const allProjects = await Project.findAll();
    console.log('\n📋 All projects in database:');
    allProjects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.name} - ${project.type} - Photos: ${project.photos.length}`);
    });
    
  } catch (error) {
    console.error('❌ Error adding sample data:', error);
  } finally {
    process.exit(0);
  }
};

// Run the script
addSampleData();





