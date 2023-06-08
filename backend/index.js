const express = require("express");
const collection = require("./models/teachermodel");
const dbConnect = require("./db/database");
const cors = require("cors");
const errorHandler=require('./middleware/errorhandler')
const router = require('./routes/routes')
const cookieParser =require('cookie-parser')
const {PORT} =require('./config/config')



const corsOptions ={
    credential:true,
    origin:['http://localhost:3000']
}

const app = express();

app.use(cors(corsOptions));

app.use(cookieParser())


app.use(express.json());
app.use(router)


  


app.use(express.urlencoded({ extended: true }));

app.use(errorHandler)



// //LOGIN POST REQUEST

// app.post("/teacher/login", async (req, res) => {
//   //Todo change attributes

//   const { email, password } = req.body;

//   try {
//     const check = await collection.findOne({ email: email });

//     if (check) {
//       res.json("exist");
//     } else {
//       res.json("notexist");
//     }
//   } catch (e) {
//     res.json("notexist");
//   }
// });

// //SIGNUP POST REQUEST

// app.post("/teacher/signup", async (req, res) => {

//   //Todo change attributes

//   const{name,institute,phone,email,password}=req.body

//   const data={
//     tname:name,
//     institute:institute,
//     phone:phone,
//     email:email,
//     password:password,
//   }

//   try {
//     const check = await collection.findOne({ email: email });

//     if (check) {
//       res.json("exist");
//     } else {
//       res.json("notexist");
//       await collection.insertMany([data])
//     }

//   } catch (e) {
//     res.json("notexist");
//   }

// });

app.listen(PORT, () => console.log("Backend is running"));
