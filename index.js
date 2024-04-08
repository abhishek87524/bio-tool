const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const { registerUser, loginUser} = require("./controllers/auth");
const {dashBoardData} = require("./controllers/dashboard");
const {getUserData, getUserSocials} = require("./controllers/getUserdata");
require("dotenv").config();
 
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Mongodb Connected`);
  })
  .catch((err) => {
    console.log(err.message);
  });
 
app.get("/", (req, res) => {
  res.send(`Server is running on port ${port}`);
});
 
app.post("/api/register", registerUser);
app.post("/api/login", loginUser);
app.post("/data/dashboard", dashBoardData);
app.get("/get/:handle", getUserData);
app.get('/get/socials/:handle', getUserSocials);

const port = process.env.PORT || 8080;
 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});