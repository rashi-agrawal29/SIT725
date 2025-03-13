var express = require("express")
var path = require("path");
var app = express()
var port = process.env.port || 3000;
app.listen(port,()=>{
console.log("App listening to: "+port)
})
// Middleware to parse JSON
app.use(express.json());

// Serve static HTML file
app.use(express.static(path.join(__dirname, "public")));

// GET route for addition
app.get("/add", (req, res) => {
  let num1 = parseFloat(req.query.num1);
  let num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.json({ error: "Invalid numbers provided" });
  }

  let result = num1 + num2;
  res.json({ result });
});

// POST route for subtraction
app.post("/subtract", (req, res) => {
  let { num1, num2 } = req.body;

  if (isNaN(num1) || isNaN(num2)) {
    return res.json({ error: "Invalid numbers provided" });
  }

  let result = num1 - num2;
  res.json({ result });
});