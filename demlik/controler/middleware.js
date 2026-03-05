import jwt from 'jsonwebtoken'
import {ACCESS_TOKEN,REFRESH_TOKEN} from "./global.js";


export const verifyToken = async (req,res,next) => {

    const token = req.cookies[ACCESS_TOKEN]

    try {


    if(!token)
        return res.status(401).json("token yok")

    jwt.verify(token,process.env.JWT_ACCESS_SECRET,(err,user) => {
        if(err){
            console.error(err.message)
            res.status(401).json("error token")
        }
        req.user = user
        next()
    })
    }
    catch (err)
    {
        console.error(err.message)
       return res.status(401).json("error token")
    }

}
export const isAdmin = async(req,res,next) => {

    const user = req.user

    if (!user)
        return res.status(400).json({eror:"user yok"})
    if (user.role !== "admin")
        return res.status(403).json({msg:"admin değilsiniz"})

    next()


}

export const isUserAndAdmin = async(req,res,next) => {
    const user = req.user
    if (!user)
        return res.status(403).json({msg:"user does not exist"})
    next()
}

