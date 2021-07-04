const express=require("express")
const mongoose = require("mongoose");
const dotenv=require("dotenv")
const cookieParser=require('cookie-parser')
const cors=require('cors')
const app = express();
const PORT = 5000;
dotenv.config();
app.use(express.json())
app.use(cookieParser());

app.use(
    cors({
      origin:['http://localhost:3000'],
      credentials:true
    }));

app.listen(PORT, () => {
        console.log(`Server Running on ${PORT}`);
       });
// MongoDB Connected
mongoose
  .connect("mongodb://localhost/mern-social-media", {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify:false,
     useCreateIndex: true,
 
  })
  .then(() => console.log("MongoDB Connected"));

// Routes
app.use('/auth',require('./routers/userRouter'));
app.use('/post',require('./routers/postRouter'));
