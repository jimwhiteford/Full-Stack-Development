const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGODB_TEST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => console.log("connected"))
  .on("error", (error) => {
    console.warn("Error : ", error);
  });

beforeEach((done) => {
  mongoose.connection.dropDatabase("Test");
  done();
});
