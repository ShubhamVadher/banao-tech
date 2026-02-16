require('dotenv').config()
const express=require('express')
const cooki_parser=require('cookie-parser');
require('./config/connection')
const User=require('./models/user')
const jwt=require('./JWT/jwt')
const bcrypt=require('bcrypt')
const cors = require('cors');


const isloggedin=require('./middelware/isloggedin')
const app=express()
app.use(express.urlencoded({extended:true}))
app.use(cooki_parser());
app.use(express.json())
app.use(cors({
  origin: "https://banao-mern-sq4t.onrender.com",
  credentials: true
}));
app.post('/signin',async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    const passcheck=await bcrypt.compare(password,user.password)
    if(!passcheck){
        return  res.status(401).json({message:"Incorrect password or email"})
    }
    else{
        const tok=jwt(user);
        return res.cookie('token',tok).status(200).json({message:"logged in"})
    }
})

app.post('/signup',async(req,res)=>{
    const {username,email,password}=req.body;
    let user=await User.findOne({email});
    if(user){
        
        return res.status(409).json({message:"User already exists"})
    }
    else{
        const hashedPassword = await bcrypt.hash(password, 10);
        user=await User.create({name:username,email,password:hashedPassword});
        const tok=jwt(user);
        return res.cookie('token',tok).status(200).json({message:"logged in"})
    }
})

app.get('/isloggedin',isloggedin,async(req,res)=>{
    return res.status(200).json({ message: "Authorized" });

})

app.get('/logout',isloggedin,async(req,res)=>{
    res.clearCookie('token'); 
    return res.status(200).send('Logged out successfully');
})

app.get("/me", isloggedin, async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.json({
        username: user.name,
        email: user.email
    });
});


app.post("/change-password", isloggedin, async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: "Password updated successfully" });
});


app.listen(5000,()=>{console.log("listening over 5000")});
