const mongoose = require("mongoose");
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();

// import the body parser for the input field
const bodyParser = require('body-parser')

// Connection to the database with mongoose
mongoose
  .connect(process.env.DATABASE_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log(`Database not connected -> ${error.message}`);
  });

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

//reference the route from the routes folder
const indexRouter = require("./routes/index");
//Author router

const authorRouter = require("./routes/authors")

// book route
const bookRouter = require("./routes/books")

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({limit: '10mb', extended:false}))

// use the route from index
app.use("/", indexRouter);

// use the router from Authors
app.use("/authors", authorRouter)
// use the router for Books
app.use("/books", bookRouter)

app.listen(process.env.PORT || 3000);
