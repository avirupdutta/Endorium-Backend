require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { DATABASE_URL } = require("./settings");
const usersRouter = require("./routes/users");
const messagesRouter = require("./routes/messages");
const tokenRouter = require("./routes/token");

const app = express();
app.use(cors());

//Connection to Database
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

// setting up the server for req with json body
app.use(express.json());

// Setting up the routes
app.use("/api/users", usersRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/token", tokenRouter);

//Listening on a port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(`The Server is running on http://localhost:${PORT}`)
);
