import User from "../models/User.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};


export const register = async (req,res) =>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "Please enter all fields"});
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({message: "Please enter a valid email"});
    }

    if(!validator.isStrongPassword(password)){
        return res.status(400).json({message: "Please enter a strong password"});
    }

    try {
        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({message: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const savedUser = await new User({email, 
                        password: hashedPassword}).save();

        const token = generateToken(savedUser._id);
        res.status(201).json({
            success: true,
            data: savedUser,
            token,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }

};

export const login = async (req,res) =>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "Please enter all fields"});
    }

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User does not exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = generateToken(user._id);
        res.status(200).json({
            success: true,
            data: user,
            token,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
        
    }
};
