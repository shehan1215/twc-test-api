const express = require("express");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
var cors = require('cors')

connectDb();
app.use(cors())
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use("/api/contacts", require("./routes/contactRoute"));
app.use("/api/users", require("./routes/userRoute"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
