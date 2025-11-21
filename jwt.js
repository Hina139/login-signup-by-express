import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import user from '../model/userschema.js'
dotenv.config()
const Secret_Key=process.env.SECRET_KEY;
export const generateToken=async(userId)=>{

const token=jwt.sign({userId:userId},
    Secret_Key,{
        expiresIn:'1h'
    }
)
return token
    
   
}
export const verifyToken=async(token)=>{
    const decode =jwt.verify(token,Secret_Key)
    const founduser=await user.findOne({
        _id:decode?.userId})
        return founduser;
    }
