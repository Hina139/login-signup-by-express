import user from "../model/userschema.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { generateToken } from "../helper/jwt.js";
dotenv.config();


// -------- SIGNUP --------
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.json("Email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new user({ name, email, password: hashedPassword }).save();

    res.json("Successfully signed up!");
  } catch (error) {
    res.json("Can't signup");
  }
};

// -------- LOGIN --------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const existinguser = await user.findOne({ email });
    if (!existinguser) {
      return res.json("Please register first");
    }

  
const isMatch = await bcrypt.compare(password, existinguser.password);

    if (!isMatch) {
      return res.json("Invalid password");
    }
const token=await generateToken (existinguser._id)
if(token){
  res.json({token})
}
else{
  res.json('register yourself')
}
  } catch (error) {
    res.json({ "message": "Login failed" });
  }
  
};
export const getusers=async(req,res)=>{
    try{
 const data=await user.find();
    res.json(data)
    }
   catch(error){
    res.json('error')
   }
  };