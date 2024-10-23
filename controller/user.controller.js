const userController = {};
const User = require("../model/User");
const bcrypt = require('bcryptjs'); // bcrypt 대신 bcryptjs 사용
const saltRounds = 10;

userController.createUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        // 1. 비밀번호 공백 검사
        if (!password || password.trim().length === 0) {
            throw new Error('비밀번호는 공백일 수 없습니다.');
        }

        // 2. 이미 존재하는 유저 확인
        const user = await User.findOne({ email });
        if (user) {
            throw new Error('이미 가입된 이메일입니다.');
        }

        // 3. 비밀번호 해시화
        const hash = await bcrypt.hash(password, saltRounds);

        // 4. 새로운 유저 생성
        const newUser = new User({ email, name, password: hash });
        await newUser.save();

        res.status(200).json({ status: "success" });
        console.log("hash", hash);
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
};

userController.loginWithEmail = async (req, res) => {
    console.log("Login attempt:", req.body);
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password); // bcrypt 대신 bcryptjs의 비교 함수 사용
            if (isMatch) {
                const token = user.generateToken();
                return res.status(200).json({ status: "success", user, token });
            }
        }
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
    } catch (error) {
        res.status(400).json({ status: "fail2", message: error.message });
    }
};


userController.getUser=async(req,res)=>{
    try{
        const {userId} = req;
        const user = await User.findById(userId);
        if(!user){
            throw new Error("can not find user");
        }
        res.status(200).json({status : "success", user});
    }catch(error){
        res.status(400).json({status : "fail3434", message:error.message});
    }
}
module.exports = userController;
