const http = require("http"); // standard http server
const express = require("express"); // express library
const cors = require('cors'); // cors middleware to have a great API experience
const path = require("path"); // express has a method for using local path. but now.sh doesn't like it.
const app = express(); // Express server (we seperate to introduce middleware) you could also do: app = require("express")()
const port = process.env.PORT || 8080; // use any port you want or use a enviromental PORT variable
const bodyParser = require('body-parser'); // to parse "POST"
app.use(bodyParser.urlencoded({ extended: false })); // Part of "parsing POST"
app.use(express.json()); // Now express no longer needs the body-parser middleware and has it's own.
app.set('view engine', 'ejs'); // I choose the "EJS" view engines. Other popular are hbs, pub and hogan
app.set("views", path.join(__dirname, `/views`)); // specify the location of the "views". NOT needed for dev but NOW.SH needs it
app.use(cors()); // For APIS this allows CORS access
app.use(express.static(path.join(__dirname, "/public"))); // This is for static files. like CSS or Images etc.

// root. when accessing http://localhost:5000
app.get("/",(req,res)=> {
    var HelloWorld = "Hello World";
    res.render('index.ejs',{HelloWorld:HelloWorld}); // open the /views/index.ejs file and pass an object called "HelloWorld"
    // you do not need res.end(), the render will take care of this.
  });

// example of a POST from the front page.
app.post("/submit", (req,res) => {
    let name = req.body.name; // the "name" input field from the front page
    res.end("Thank you for your post, " + name);
 });

// start the web server.
let server = http.createServer(app);
server.listen(port);
console.log("http server listening on http://localhost:%d", port); // this is a good idea and will remind you which port it's listening to.
