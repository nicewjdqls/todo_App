const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 1, // 비밀번호 최소 길이 설정
        validate: {
            validator: function (Passlen) {
                return Passlen && Passlen.trim().length > 0;  // 공백 확인
            },
            message: "비밀번호는 공백일 수 없습니다."
        }
    }
}, { timestamps: true });

userSchema.methods.toJSON = function () {
    const obj = this._doc;
    delete obj.password;
    delete obj.__v;

    return obj
}

userSchema.methods.generateToken = function (){
    const token = jwt.sign({ _id: this.id}, JWT_SECRET_KEY,{expiresIn : '5m'})
    return token;
}
const User = mongoose.model("User", userSchema);
module.exports = User;