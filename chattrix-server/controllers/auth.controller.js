import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import {  generateToken } from "../lib/utilis.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!email) {
      res.status(404).json({ message: "email not found!" })
    };
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 character!' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered!' });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await User({

      fullName,
      email,
      password: hash,
    });
    await newUser.save()
    if(newUser) {
      generateToken(newUser._id,res);
      res.status(201).json({
        _id:newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        
        profilePic: newUser.profilePic,
      })
    }else{
      res.status(400).json({message: "Invalid user data!"});
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server problem', error: error.message });
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({ message: 'please fill email and password!' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'user not found!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'wrong password!' });
    }

 generateToken(user._id, res)
    //const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({
      _id:user._id,
      fullName: user.fullName,
      email: user.email,
      
      profilePic: user.profilePic,
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error', error: error.message });
  }
}

export const logout = (req, res) => {
try {
  res.cookie("jwt", "", {maxAge: 0})
  res.status(200).json({message: "Logout successfully done!"})
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'server error', error: error.message }); 
}
}
export const updateProfile = async(req,res) => {
  try {
    const {profilePic} = req.body;
    const userId = req.user._id;
    if(!profilePic) {
      return res.status(400).json({message: "Profile pic is required!"});
    }
   const uploadResponse = await cloudinary.uploader.upload(profilePic)
   const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true})

   res.status(200).json(updatedUser)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error', error: error.message }); 
  }
}

export const cheekAuth = (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error', error: error.message }); 
  }
}