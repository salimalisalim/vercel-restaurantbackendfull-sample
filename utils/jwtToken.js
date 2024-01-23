const jwt = require("jsonwebtoken");

exports.getToken = (req,res,next)=>{

    const options = {
        id:res.user.id,
        time:Date.now()
    }

    const token = jwt.sign(options,"dasdadada",{expiresIn:'5min'});

    res.status(200).cookie("token",token).json({
        success:true,
        user:res.user,
        token,
        message:"Logged in successfully!",
        isAuthenticated:true,
    })

}
