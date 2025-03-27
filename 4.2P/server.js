var express = require("express")
const mongoose = require('mongoose');
var app = express()
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/Week4-DB', {});

const ProjectSchema = new mongoose.Schema({
	title: String,
	image: String,
	link: String,
	description: String,
});

const Project = mongoose.model('Project', ProjectSchema);

app.get('/api/projects', async (req, res) => {
	const projects = await Project.find({});
	res.json({ statusCode: 200, data: projects, message: "Success" });
});

var port = process.env.port || 3000;
app.listen(port,()=>{
	console.log("App listening to: "+port)
})