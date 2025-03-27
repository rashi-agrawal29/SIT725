const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Week4-DB', {});

const ProjectSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  description: String,
});

const Project = mongoose.model('Project', ProjectSchema);

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

Project.insertMany(sampleData)
  .then(() => {
    console.log("Sample data inserted");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));