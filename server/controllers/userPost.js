import UserDetails from "../models/userDetails.js";
import mongoose from "mongoose";
import Validations from "../validations/index.js";

const getPosts =  async (req,res) => {
    
    try {
        const posts = await UserDetails.find();
        res.json(posts)
    } catch (error) {
        res.json(error)
    }

}

const createPost =  async (req,res) => {
    
    try {

        const validData = await Validations.userDetailSchema.validateAsync(req.body)

        const isExistingEmail = await UserDetails.findOne({ userEmail: validData.userEmail });
        if(isExistingEmail) return res.status(400).json({ message: "Email already exists" });

        const isExistingNIC = await UserDetails.findOne({ NIC: validData.NIC });
        if(isExistingNIC) return res.status(400).json({ message: "NIC already exists" });

        // const isExistingMobile = await UserDetails.findOne({ mobileNumber: validData.mobileNumber });
        // if(isExistingMobile) return res.status(400).json({ message: "Mobile Number already exists" });

        const newPost = new UserDetails(validData);

        await newPost.save();
        res.status(201).json({message: "User Created Successfully"});

    } catch (error) {
        res.status(422).json({ message: error.message });
    }

}

const updatePost =  async (req,res) => {
    
    const post = req.body;
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send({message: "No post with that id"});

    try {

        const updatedPost = await UserDetails.findByIdAndUpdate(id,{...post,_id:id},{new: true});
        res.json({message: "User Updated Successfully"})

    } catch (error) {
        res.json(error)
    }

}

const deletePost =  async (req,res) => {
    
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send({message: "No post with that id"});

    try {

        await UserDetails.findByIdAndRemove(id)
        res.json({message: "User Deleted Successfully"})

    } catch (error) {
        res.json(error)
    }

}

export default {getPosts,createPost,updatePost,deletePost};