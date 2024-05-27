import User from "../database/models/userModel.js";
import generateToken from "../config/generateToken.js";

class UserController {
  static async registerUser(req, res) {
    try {
      const { name, email, password, avatar ,role} = req.body;
      if (!name || !email || !password ) {
        res.status(404).json({ message: "all files are required" });
      }
      const userExists = await User.findOne({ email: email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }
      const newUser = await User.create({ name, email, password, avatar,role });
      if (newUser) {
         res.status(201).json({
          message: "New user created",
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.avatar,
          role:newUser.role,
          token: generateToken(newUser._id),
        });
      } else {
         res.status(500).json({ message: "Failed to create new user" });
      }
    } catch (error) {
      return res.status(500).json({ messagett: error.message });
    }
  }
  static async loginUser(req,res){
    try {
      const {email,password}=req.body
      if(!email ||!password){
        return res.status(404).json({message:"all files are required"})
      }
      const user=await User.findOne({email:email})
      if(!user){
        return res.status(404).json({message:"User not found"})
      }
      if(user.password!==password){
        return res.status(404).json({message:"Wrong password"})
      }
      res.status(200).json({
        message: `Welcome ${user.name}`,
        _id:user._id,
        name:user.name,
        email:user.email,
        avatar:user.avatar,
        token:generateToken(user._id),
        role:user.role,
      })
    } catch (error) {
      return res.status(500).json({messagett:error.message})
    }
  }
  static async getAllUsers(req,res){
    try {
      const users=await User.find()
      res.status(200).json(users)
    } catch (error) {
      return res.status(500).json({messagett:error.message})
    }
  }
  static async getUserDetails(req,res){
    try {
      const {id}=req.params;
      // const { id } = req.query
      const user=await User.findById(id)
      if(!user){
        return res.status(404).json({message:"User not found"})
      }
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({
        status:false,
        message:error.message
      })
    }
  }
  static async updateUserDetails(req,res){
    try {
      // const {id}=req.params;
      const {id,role}=req.body;
      const user=await User.findById(id);
      if(!user){
        return res.status(404).json({message:"User not found"})
      }
      user.role=role;
      await user.save();
      res.status(200).json({
        success:true,
        message:"User updated successfully"
      })
    } catch (error) {
      res.status(404).json({
        success:false,
        message:error.message
      })
    }
  }
}

export default UserController;
