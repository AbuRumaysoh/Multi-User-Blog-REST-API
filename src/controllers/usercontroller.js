import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/usermodel.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if a user exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    // Hash Password
    const hashPassword = await bcrypt.hash(password, 10); // hash user password
    // Create userData object
    const newUser = await userModel.create({
      username,
      email,
      password: hashPassword,
    });
    return res.status(201).json({
      success: true,
      message: "Registration Successful",
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid e-mail or password." });
    }
    // Compare the new password with the hash password saved in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid e-mail or password." });
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_secret,
      { expiresIn: "1d" },
    );
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    return res
      .status(200)
      .json({ success: true, message: "Login successful." });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const testUser = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Authentication Successful.",
    user: req.user,
  });
};

export const getProfile = async (req, res) => {
  try {
    const userInfo = await userModel.findById(req.user.id).select("-password");
    if (!userInfo) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid E-mail or password." });
    }
    res.status(200).json({ success: true, data: userInfo });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Unable to retrieve user profile." });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully.",
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to retrieve users.",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const { username, email } = req.body;
    const userInfo = await userModel.findByIdAndUpdate(
      id,
      { username, email },
      { new: true, runValidators: true },
    );
    if (!userInfo) {
      return res
        .status(400)
        .json({ success: false, message: "No Profile Found." });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "Profile Updated Successfully, data: userInfo",
      });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res)=>{
    try {
        const id = req.user.id;
        const user = await userModel.findByIdAndDelete(id);
        if(!user){
            return res.status(400).json({success:false, message:"No User Found"});
        }
        res.status(200).json({success:true, message: "User Data Deleted Successfully"})
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message: error.message})
    }
}