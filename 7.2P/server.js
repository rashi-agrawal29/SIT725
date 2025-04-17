var express = require("express");
var path = require("path");
var app = express();
var port = process.env.PORT || 3000;

const http = require('http').createServer(app);
const io = require('socket.io')(http); // Pass http server to socket.io

// Middleware to parse JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Start the server to listen on the specified port
http.listen(port, () => {
  console.log("App listening on port: " + port);
});

// Set up the socket.io connection
io.on('connection', (socket) => {
  console.log('A new user is connected');
  
  socket.on('disconnect', () => {
    console.log('The user has disconnected');
  });

  // Emit a random greeting message every second
  setInterval(() => {
    socket.emit('Greetings', parseInt(Math.random() * 10));
  }, 1000);
});

// GET route for addition
app.get("/add", (req, res) => {
  let num1 = parseFloat(req.query.num1);
  let num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send("Invalid input");
  }

  let result = num1 + num2;
  res.status(200).json({ result });
});

// POST route for subtraction
app.post("/subtract", (req, res) => {
  let { num1, num2 } = req.body;

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: "Invalid numbers provided" });
  }

  // Perform subtraction
  let result = num1 - num2;
  res.status(200).json({ result });
});
