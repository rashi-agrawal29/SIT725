const mongoose = require('mongoose');
const Project = require('./models/projectModel'); // Import the model

mongoose.connect('mongodb://localhost:27017/Week5-DB', {})
  .then(() => console.log("Database connected"))
  .catch(err => console.error("DB connection error:", err));

const sampleData = [
  {
    title: "Kitten 1",
    image: "images/kitten-2.jpg",
    link: "About Kitten 1",
    description: "Fluffy and adorable kitten",
  },
  {
    title: "Kitten 2",
    image: "images/kitten-2.jpg",
    link: "About Kitten 2",
    description: "Loves to nap in sunbeams",
  },
  {
    title: "Kitten 3",
    image: "images/kitten-3.jpg",
    link: "About Kitten 3",
    description: "Three cute kittens",
  }
];

const seedDatabase = async () => {
  try {
    await Project.deleteMany(); // Clear existing data
    await Project.insertMany(sampleData);
    console.log("Sample data inserted");
    mongoose.connection.close();
  } catch (err) {
    console.error("Seeding error:", err);
    mongoose.connection.close();
  }
};

seedDatabase();
