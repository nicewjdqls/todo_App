const authController = {}
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
authController.authenticate = (req,res,next) =>{
    try{
        const tokenString = req.headers.authorization;
        console.log("Received Token:", tokenString); // 토큰 확인

        if (!tokenString){
            throw new Error("invalid token222");
        }
        const token = tokenString.replace("Bearer ","");
        console.log("Extracted Token:", token);

        jwt.verify(token, JWT_SECRET_KEY, (error,payload)=>{
            if(error){
                throw new Error("invalid token3333");
            }
            // res.status(200).json({status : "success", userId: payload._id})
            req.userId = payload._id;
            console.log("Authenticated user ID:", req.userId); // 인증된 사용자 ID 로그

            next();
        });

    }catch(error){
        res.status(400).json({status:"fai222l", message:error.message});
    }
}

module.exports = authController;

// 미들웨어