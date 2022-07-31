import bcript from "bcryptjs";
import jwt from "jsonwebtoken"; 
import Validations from "../validations/index.js";
import User from "../models/users.js";
import nodeEmailer from "nodemailer";
import fs from "fs";
import { promisify } from "util";
import Token from "../models/token.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

const signin = async (req,res) => {
    
    try {

        const validData = await Validations.signInSchema.validateAsync(req.body)

        const existingUser = await User.findOne({ email: validData.email });

        if(!existingUser) return res.status(404).json({ message: "Invalid Email or Password" });

        const isPasswordCorrect = await bcript.compare(validData.password,existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid Email or Password"});

        if(!existingUser.isVerified){
            let token = await Token.findOne({userId: existingUser._id});

            if(!token){
                token = await new Token({
                    userId: existingUser._id,
                    token: crypto.randomBytes(32).toString("hex"),
                }).save();

                const verifiedEmailLink = `http://localhost:3000/confirmEmail/${existingUser._id}/${token.token}`
                await sendEmail(req,res,existingUser.email,"User Management System Email Verification",`link - ${verifiedEmailLink}`,verifiedEmailLink);

            }

            return res.status(400).json({message: "An Email sent to your account. Please verify the account."});

        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id },'test', { expiresIn: "2h" });

        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }


}

const signup = async (req,res) => {
    

    try {
        const validData = await Validations.signUpSchema.validateAsync(req.body)
        
        const existingUser = await User.findOne({ email: validData.email });
        if(existingUser) return res.status(400).json({ message: "User already exist." });

        const hashedPassword = await bcript.hash(validData.password,12);

        const newUser = await User.create({email: validData.email, password:hashedPassword, name:`${validData.firstName} ${validData.lastName}`});

        const newToken = await new Token({
            userId: newUser._id,
            token: crypto.randomBytes(32).toString("hex")
        })

        await newToken.save();

        const verifiedEmailLink = `http://localhost:3000/confirmEmail/${newUser._id}/${newToken.token}`

        await sendEmail(req,res,validData.email,"User Management System Email Verification",`link - ${verifiedEmailLink}`,verifiedEmailLink);

    } catch (error) {
        res.status(422).json({ message: error.message });
    }

}

const forgotPassword = async (req,res) => {

    try {

		const readFile = promisify(fs.readFile);

        const validEmail = await Validations.resetPasswordSchema.validateAsync(req.body);

        const user = await User.findOne({ email: validEmail.email});
        if(!user) return res.status(400).json({ message: "User dosen't exist." });

        const JWT_Secret = process.env.secretKey + user.password;
        const payload = {
            email: user.email,
            id: user._id
        } 

        const token = jwt.sign(payload,JWT_Secret,{ expiresIn:"2h" });

        const resetLink = `http://localhost:3000/resetPassword/${user._id}/${token}`;

        await sendEmail(req,res,validEmail.email,"User Management System Password Reset",`link - ${resetLink}`,resetLink);

        
    } catch (error) {
        res.status(422).json({ message: error.message });
    }

    

}

const resetPassword = async (req,res) => {

    try {
        const {id,token} = req.params;
        const {newPassword} = req.body;
        
        const user = await User.findById({_id:id});
        if(!user) return res.status(404).json({ message: "Invalid ID, User dosen't exist" });

        const secretKey = process.env.secretKey;
        const JWT_Secret = secretKey + user.password;

        const payload = jwt.verify(token,JWT_Secret);

        const hashedPassword = await bcript.hash(newPassword,12);

        const updatedUser = await User.findByIdAndUpdate(id,{password:hashedPassword, _id:id},{ new: true });
        res.status(200).json( {message: "Your password has been successfully reset" } )

    } catch (error) {
        res.status(500).json({ message: "Invalid URL" })   
    }

}

const confirmEmail = async (req,res) => {

    try {
        
        const { id,token } = req.params;

        const user = await User.findById({_id: id});
        if(!user) return res.status(400).json({ message: "User dosen't exist." });

        const validToken = await Token.findOne({userId: id});
        if(!validToken) return res.status(400).json({ message: "Invalid Token" });

        const verifiedUser = await User.findByIdAndUpdate(id,{isVerified: true,_id: id},{new:true})

        await validToken.remove();

        res.status(200).json({ result: verifiedUser });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    


    

}

export default {signin,signup,forgotPassword,resetPassword,confirmEmail};