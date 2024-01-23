
const jwt = require("jsonwebtoken");

exports.verifyToken = async (req,res,next)=>{

    const token = req.cookies.token;

    if(!token){
       return res.status(401).json({
            success:false,
            message:"Access denied. Token requered",
            isAuthenticate:false
        });
    }

   jwt.verify(token,"dasdadada", (err, decoded)=>{

    if(err){
        return res.status(401).json({
            success:false,
            message:"Invalid token",
            isAuthenticate:false
        });
    }

    req.userId = decoded.indexOf;

    next();

   });

    

    

}