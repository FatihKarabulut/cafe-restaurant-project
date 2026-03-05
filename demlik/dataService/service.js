import repo from "../repo/repository.js"
import bcrypt from "bcrypt"

export const saveProductService = async (product) => {

    try {

        return await repo.save(product);
    }
    catch (err){
        console.log(err.message)
        throw err
    }


}

export const findByProductNameService = async (name) => {

    try {

        return repo.findByProductName(name)

    }
    catch (err)
    {
        console.log(err.message)
        throw err
    }


}
export const findByCategoryService = async (category) => {

    try {
        return await repo.findByCategory(category)

    }
    catch (err){
        console.log(err.message)
        throw err
    }


}

export const findByProductService = async () => {

    try {

       return await repo.findByProduct()
    }
    catch(err)
    {
        console.log(err.message)
        throw err
    }

}

export const updatePriceService = async (price,productName) => {

    try {

        return await repo.updatePrice(price,productName)

    }
    catch (err)
    {
        console.log(err.message)
        throw err
    }

}


export const deleteByNameService = async (name) => {



    try {

        return await repo.deleteByName(name)
    }
    catch (err)
    {
        console.log(err.message)
        throw err
    }

}

export const DeleteProductService = async () => {

    try {

        return await repo.DeleteProduct()
    }
    catch (err)
    {
        console.log(err.message)
        throw err
    }

}
/// user

export const saveUserService = async (user) => {

    try {

        user.users_password = await bcrypt.hash(user.users_password,10)
        return await repo.saveUser(user)

    }
    catch (err)
    {
        console.log(err.message)
        throw err
    }

}

export const updateUserPasswordService = async (password,username) => {

    try {

        return await repo.updateUserPassword(await bcrypt.hash(password,10),username)
    }
    catch (err)
    {
        console.log(err.message)
        throw err
    }


}

export const updateUserNameAndPasswordService = async (newName,password,name) => {


    try {

        return await repo.updateUserNameAndPassword(newName,await bcrypt.hash(password,10),name)
    }
    catch (err) {
        console.log(err.message)
        throw err
    }

}
export const findByUserNameService = async (userName) => {


    try {

        return await repo.findByUserName(userName)
    }
    catch (err)
    {
        console.log(err.message)
        throw err

    }

}

export const deleteByUserNameService = async(name) => {

    try {
        return await repo.deleteByUserName(name)
    }
    catch (err)
    {
        console.log(err.message)
        throw err
    }

}

export const DeleteByUserService = async () =>{

    try {

        return await repo.DeleteByUser()
    }
    catch (err)
    {
        console.log(err.message)
        throw err
    }

}

export const loginUser = async (username,password) => {

    try {

        const arr = await findByUserNameService(username)


        if (arr.length === 0)
            throw new Error("User not registered")

        const dbPassword = arr[0].users_password


        return await bcrypt.compare(password,dbPassword) ? findByUserNameService(username) : null

    }
    catch (err)
    {
        console.log(err.message)
        throw err
    }

}

export default {saveProductService ,findByProductNameService,findByCategoryService,findByProductService,updatePriceService
    ,deleteByNameService, DeleteProductService,saveUserService,updateUserPasswordService,
    updateUserNameAndPasswordService,findByUserNameService,deleteByUserNameService,DeleteByUserService,loginUser
}