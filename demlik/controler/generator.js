
import dotenv from "dotenv";
dotenv.config()
import jwt from 'jsonwebtoken';


export const generatorAccessToken = (data) => {

    return jwt.sign(data,process.env.JWT_ACCESS_SECRET,{expiresIn:process.env.JWT_ACCESS_EXPIRESIN})

}

export const generatorRefreshToken = (data) => {

    return jwt.sign(data,process.env.JWT_REFRESH_SECRET,{expiresIn:process.env.JWT_REFRESH_EXPIRESIN})
}