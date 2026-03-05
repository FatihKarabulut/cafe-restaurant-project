import services from "../dataService/service.js"
import jwt from "jsonwebtoken";
import {generatorAccessToken, generatorRefreshToken} from "./generator.js";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "./global.js";
import {isAdmin, isUserAndAdmin, verifyToken} from "./middleware.js";
import service from "../dataService/service.js";
import {findByUserName} from "../repo/repository.js";


const saveProductControler = (product) => {

    if (!product)
        return false
  const emptiys = v => v == null || v.toString().trim() === "";

    return !(emptiys(product.products_img)||
             emptiys(product.products_name)||
             emptiys(product.products_price)||
            isNaN(product.products_price)||
            product.products_price <= 0 ||
             emptiys(product.products_category)
    )


}
const saveProductCallback = async (req,res) => {
    const product = req.body;
    try {

        if (saveProductControler(product))
        {
            await services.saveProductService(product)
            return res.status(201).json("save ok")
        }
        return res.status(400).json({msg:"The data is incomplete or not properly filled out."})


    }
    catch(err) {
        console.log(err.message);
        return res.status(500).json({msg:err.message})
    }

}

const findByProductNameCallback = async (req,res) => {

    try {
        const name = req.query.name
        if (!name)
            return res.status(400).json({msg:"name is required"})


        const data = await services.findByProductNameService(name)

        return await res.json(data)
    }
    catch (err)
    {
        console.log(err.message);
        return res.status(500).json({msg:err.message})
    }
}

const findByCategoryNameCallback = async (req,res) => {

    try{
        const category = req.query.category
        if (!category)
            return res.status(400).json({msg:"category is required"})

        console.log(category)
        const data  = await services.findByCategoryService(category)
        console.log(data)
        return res.status(200).json(data)
    }
    catch (err)
    {
        console.log(err.message);
        return res.status(500).json({msg:err.message})
    }
}

const findByProductCallback = async (req,res) => {

    try{
    console.log("findALl")
        return res.status(200).json(await services.findByProductService())
    }
    catch (err)
    {
        console.log(err.message);
        return res.status(500).json({msg:err.message})
    }
}

const updatePriceCallback = async (req,res) => {

    try {
        const {price,productName} = req.body;
        if (isNaN(price) || !productName)
            return res.status(400).json({msg:"price is required"})

        const updatePrice = await services.updatePriceService(price,productName)

        return res.status(200).json({msg:updatePrice ? "success" : "failure"})
    }
    catch (err)
    {
        console.log(err.message);
        return res.status(500).json({msg:err.message})
    }
}


const deleteByNameCallback = async (req,res) => {

    try {
        const {name} = req.body
        if (!name)
            return res.status(400).json({msg:"name is required"})

        const deleteByName = await services.deleteByNameService(name)
        return res.status(200).json({msg:deleteByName ? "success" : "failure"})
    }
    catch (err)
    {
        console.log(err.message)
        return res.status(500).json({msg:err.message})
    }

}

 const DeleteProductCallback = async (req,res) => {

    try {

        const deleteProduct = await services.DeleteProductService()
        return res.status(200).json({msg:deleteProduct})
    }
    catch (err)
    {
        console.log(err.message)
        return res.status(500).json({msg:err.message})
    }

}

const loginCallback = async (req,res) => {
        const {username, password} = req.body;


        console.log("loginUserAdmin", username, password);
    if (!username || !password)
        return res.status(400).json("email or password is required")

    try {
        const data = await services.loginUser(username, password)

        if (!data)
        {
            console.log("doesn't exist ")
            return res.status(401).json("email or password is required")
        }


        const id = data[0].users_id
        const role = data[0].users_role
        const accessToken = generatorAccessToken({id:id,role:role})
        const refreshToken = generatorRefreshToken({id:id,role:role})
        res.cookie(ACCESS_TOKEN,accessToken,{
            httpOnly:true,
            secure:true,
            sameSite:"lax",
            maxAge:60 * 15 * 1000
        })

        res.cookie(REFRESH_TOKEN,refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:"lax",
            maxAge: 7 * 24 * 60 * 60 * 1000

        })

        return res.status(200).json({msg:"success"})
    }
    catch (err)
    {
        console.log(err.message);
        return res.status(500).json({msg:err.message})
    }


}

const saveUserCallback = async (req,res) => {

    try {
        const user = req.body;
        if (!user.users_name || !user.users_password || !user.users_role)
            return res.status(400).json("user is required")

        const savedUser = await services.saveUserService(user)

        return res.status(201).json({msg:savedUser?"success":"failure"})
    }
    catch(err) {
        console.log(err.message);
        return res.status(500).json({msg:err.message})
    }
}

 const updateUserPasswordCallback = async (req,res) => {

    try {
        const {username, password} = req.body;
        if (!username || !password)
            return res.status(400).json("username is required")

        const updateUserPassword = await services.updateUserPasswordService(password,username)
        return res.status(200).json({msg:updateUserPassword ? "success" : "failure"})
    }
    catch (err)
    {
        console.log(err.message)
        return res.status(500).json({msg:err.message})
    }


}

 const updateUserNameAndPasswordCallback = async (req,res) => {

    try {

        const {newName,password,name} = req.body
        if (!newName || !password || !name)
            return res.status(400).json("data is required")

        const update = await services.updateUserNameAndPasswordService(newName,password,name)
        console.log(`updateAndPassword  ${update}, ${newName}, ${password} ${name}`)
        return res.status(200).json({msg:update ? "success" : "failure"})
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).json({msg:err.message})
    }

}

 const deleteByUserNameCallback = async(req,res) => {

    try {
        const {username} = req.body

        if (!username)
            return res.status(400).json("name is required")

        const deleteUser = await services.deleteByUserNameService(username)
        console.log(username)
        return res.status(200).json({msg:deleteUser ? "success" : "failure"})
    }
    catch (err)
    {
        console.log(err.message)
        return res.status(500).json({msg:err.message})
    }

}

export const refreshToken = async(req,res) => {

    const token = req.cookies[REFRESH_TOKEN]

    console.log("refreshToken", token)
    try {

        if (!token)
            return res.status(401).json("token is required")

       const data = jwt.verify(token,process.env.JWT_REFRESH_SECRET)

           const accessToken = generatorAccessToken({id:data.id,role:data.role})
               res.cookie(ACCESS_TOKEN,accessToken, {
                   httpOnly:true,
                   secure:true,
                   sameSite:"lax",
                   maxAge:60 * 15 * 1000
               })
               return res.status(200).json({ msg: "access renewed" })



    }
    catch (err)
    {
        console.log(err.message)
        return res.status(500).json({msg:err.message})
    }

}

const logoutCallback = async(req,res) => {

    try {
        console.log("logout")
        res.clearCookie(ACCESS_TOKEN,{
            httpOnly:true,
            secure:true,
            sameSite:"lax",
        })
        res.clearCookie(REFRESH_TOKEN,{
            httpOnly:true,
            secure:true,
            sameSite:"lax",

        })
        res.json({msg:"success"})
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).json({msg:err.message})
    }
}
const findByUserNameCallback = async (req, res) => {

    try {
        const userName = req.query.username
        if (!userName)
            return res.status(400).json({msg:"username required"})

        console.log(userName)
        return res.json(await service.findByUserNameService(userName))
    } catch (err) {
        console.log(err.message)
        res.status(500).json({msg: err.message})
    }
}
export const createEndPoint = async (app,port) => {



    app.listen(port,() => console.info(`server starter localhost:${port}`))

    app.post("/products",verifyToken,isUserAndAdmin ,async (req, res) => await saveProductCallback(req,res))
    app.post("/login", async (req, res) => await loginCallback(req,res))
    app.post("/userSave",verifyToken,isAdmin, async (req, res) => await saveUserCallback(req,res))
    app.get("/findByProductName", async (req,res) => findByProductNameCallback(req,res))
    app.get("/findByProduct", async (req,res) => await findByProductCallback(req,res))
    app.get("/findByCategoryName", async (req,res) => await findByCategoryNameCallback(req,res))
    app.patch("/updatePrice",verifyToken,isUserAndAdmin,async (req,res) => await updatePriceCallback(req,res))
    app.delete("/deleteByName",verifyToken,isAdmin, async (req,res) => await deleteByNameCallback(req,res))
    app.delete("/DeleteProduct",verifyToken,isAdmin,async (req,res) => await DeleteProductCallback(req,res))
    app.patch("/updateUserPassword",verifyToken,isUserAndAdmin, async (req,res) => await updateUserPasswordCallback(req,res))
    app.patch("/updateUserNameAndPassword", verifyToken,isAdmin, async (req,res) => await updateUserNameAndPasswordCallback(req,res))
    app.delete("/deleteByUserName",verifyToken,isAdmin, async (req,res) => await deleteByUserNameCallback(req,res))
    app.get("/refreshToken",async (req,res) => await refreshToken(req,res))
    app.get("/logout",verifyToken,isUserAndAdmin,async (req,res) => await logoutCallback(req,res))
    app.get("/findByUser",verifyToken,async (req,res) => findByUserNameCallback(req,res))

}