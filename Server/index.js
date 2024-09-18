const express = require('express');
const app = express();
const port = 3030;
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');
const {v4:uuidv4} = require('uuid')






const { MongoClient, ServerApiVersion } = require('mongodb');
const { type } = require('os');
// const uri = "mongodb+srv://uditjain:u1d2i3t4@lms-cluster.s5q8x.mongodb.net/?retryWrites=true&w=majority&appName=LMS-Cluster/ApplicationDB";
const uri = "mongodb+srv://uditjain:u1d2i3t4@lms-cluster.s5q8x.mongodb.net/ApplicationDB";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
  
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




















app.use(express.json())
// app.use(bodyParser.json());
app.use(cors({
    origin: '*', // Allow only this origin
  }));


// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/imagesDB', {
mongoose.connect(uri)

// Image Schema
const imageSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
});

// const courseScheme = new mongoose.Schema({
//     title:{type:String, required:true},
//     validity:{type:String},
//     description:{type:String, equired:true},
//     startdate:{type:String, required:true},
//     coursecontext:{type:String, required:true}
// })

const courseSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  videos: {
    type: [String],  // Array of video URLs
    default: []  // Default to an empty array
  },
  price:{
    type: String,
    required: true
  },
  about:{
    type:String
  }
});


// The model name should be capitalized and singular
const Image = mongoose.model('Image', imageSchema, 'slider'); // Explicitly use 'slider' collection
const Courses = mongoose.model('Courses',courseSchema,'courses')
// Basic route to check if the server is running
app.get('/', (req, res) => {
    res.json({msg:"server is running"});
});

// Route to retrieve all images from 'slider' collection
app.get('/addSliderImages', async (req, res) => {
    try {
        const images = await Image.find(); // Retrieve all images from the DB
        res.json(images); // Send the images in the response
        // console.log(images)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/addCourses', async()=>{
    // try{
    //     const courses = await 
    // }
})


app.post('/signup', async (req,res)=>{
    const rMail = req.body.rmail
    const rNumber = req.body.rNumber
    
})



















//Auth system





const UserCreds = mongoose.model('userallcreds',{mail:String,password:String,date:String})




const Sessions = mongoose.model('sessions',{sessionid:String,email:String,password:String,otp:Number,date:String})

app.post('/register',async (req,res)=>{
    // res.status(200)
    console.log(req.body)
    const email = req.body.email
    const password = req.body.password
    const date = req.body.date
    console.log("email wagera milgya dekh",email)
    const User = await UserCreds.findOne({mail:email})

    const otp =  Math.floor(10000 + Math.random() * 90000);
    const sessionId = uuidv4()
    console.log("Ye session id bnayi use ke liye",sessionId)
    const newid = new Sessions({sessionid:sessionId,email:email,password:password,otp:otp,date:date})
    newid.save().then(()=>{console.log("New session id made")})

    res.send(sessionId)

    // res.cookie('sessionId',sessionId,{
    //     httponly:false,
    //     secure:false,
    //     maxAge:5*60*1000
    // })


var transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
            user: 'uditj668@gmail.com',
            pass: 'lilj hdgi opfe bxxs'
    }
})

var mailOptions={
    from: 'uditj668@gmail.com',
    to: email,
    subject:'One Time Password',
    text:'This is one time otp for veeram,dont share it with anybody-'+otp

}

    if(User){
        console.log("User already exists, you need to login")
        res.send("1")
    }
    else{
    // const NewUser = new UserCreds({mail:email,password:"system-automated-password"})
    // NewUser.save().then(()=>{console.log("New User Registered!")})
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error)
        }else{
            console.log('Email sent:' + info.response)
        }
    })
    }    
    // res.send("Thanks for giving email for sending otp")
})

app.post('/login', async (req, res) => {
    const { email, password, date } = req.body;

    const User = await UserCreds.findOne({mail:email})
    
    if(User){

        const ExistingUser = await UserCreds.findOne({mail:email,password:password,date:date})
        if(ExistingUser){
            console.log("Welcome Sir!")
        }else{
            console.log("Email or Password is Incorrect")
        }

    }else{
        console.log("This email isn't registered")
    }

});


app.post('/otp-check',async (req,res)=>{
    var {otp, sessionId, date} = req.body
    sessionId = sessionId.trim();

    otp = Number(otp)
    console.log("user ne ye session id di",sessionId,typeof(sessionId))
    const sessioncheck = await Sessions.find({sessionid:sessionId,otp:otp,date:date})


    if(sessioncheck){
        console.log("Successfully registered 🥳🥳")
        const email = sessioncheck.email
        const password = sessioncheck.password
    
        const NewUser = new UserCreds({mail:email,password:"system-automated-password"})
        NewUser.save().then(()=>{console.log("New User Registered!")})
    
        await Sessions.deleteOne({sessionId:sessionId})
        res.send("Successfully registered 🥳🥳")
    }else{
        console.log("Maybe otp is wrong")
        console.log(otp)
        console.log(typeof(otp))
        res.send("Maybe otp is wrong")
    }
})

app.get('/courses', async (req,res)=>{

    try{
        const courses = await Courses.find({})
        res.json(courses)
    }
    catch (error){
        res.status(500).json({ message: "Error retrieving courses", error });
    }

})

// app.get('/courses/:id', async (req,res)=>{

//     try{
//     const Id= req.params.id
//     const course = Courses.find({courseId:Id})
//     res.json(course)

//     }
//     catch (error){

//     }

// })









// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
