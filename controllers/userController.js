const bcrypt = require("bcrypt");
const saltRound = 10;
const User = require("../models/userModel");
const { getToken } = require("../utils/jwtToken");


exports.postRegister = async (req,res)=>{

    const {fullname, email, password } = req.body;

    const hashedPass = await bcrypt.hash(password, saltRound);

    try {

        const user = await User.create({
            fullname,
            email,
            password:hashedPass
        });

        if(!user){
            return res.status(500).json({
                 success:false,
                 message:"User registration failed!",
             })
         }

         res.status(201).json({
            success:true,
            message:"User registration successfully completed!",
            user
        })

    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message,
        });
    }    
   
}

exports.userLogin = async (req,res,next)=> {

    const {email, password} = req.body;

    try {

        const user = await User.findOne({email});

    console.log("user", user);

    if(!user){
        return res.status(500).json({
            success:false,
            message:"User not found!"
        });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid){
        return res.status(401).json({
            success:false,
            message:"Invalid credentials!"
        });
    }

    res.user = user;

    getToken(req,res,next)
    
    // res.status(200).json({
    //     success:true,
    //     message:"Loged in successfully!",
    //     user,
    //     isAuthenticated:true,
    // });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }

}

exports.getAllUsers = async (req,res)=>{

    console.log("aaaaaaaaaaaaaa--------------------------->>>", req.cookies.token);

    try {

        const users = await User.find();

        if(!users){
            return res.status(500).json({
                success:false,
                message:"Users not found!"
            });
        }

        res.status(200).json({
            success:true,
            users,
        });

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }

}


exports.updateUserDetails = async(req,res)=>{

    const userId = req.params.id;

    console.log(req.body);

    const {fullname, email} = req.body;

   try {

    const user = await User.findById(userId);

    if(!user){
        return res.status(404).json({success:false, message: 'User not found'});

    }

    console.log("username --------->", user.fullname);

    user.fullname = fullname;
    user.email = email;

    user.save();

    res.status(200).json({
        success:true, 
        message: 'User updated successfully!'
    });
    
   } catch (error) {
        res.status(500).json({success:false, message: error.message});
   }

}

exports.getUserDetails = async(req,res)=>{

    const userId = req.params.id;

   try {

    const user = await User.findById(userId);

    if(!user){
        return res.status(404).json({success:false, message: 'User not found'});

    }

    res.status(200).json({
        success:true, 
        message: 'User data fetched!',
        user
    });
    
   } catch (error) {
        res.status(500).json({success:false, message: error.message});
   }

}

exports.deleteUser = async (req,res)=>{

    const {id} = req.params;

    try {
        
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({success:false, message: 'User not found'});
    
        }

        res.status(200).json({
            success:true, 
            message: 'User deleted!',
        });

    } catch (error) {
        res.status(500).json({success:false, message: error.message});

    }

}