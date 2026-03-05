
import {getClient} from "./dbClient.js"

import query, {
    queryDeleteByName,
    queryDeleteProduct,
    queryFindByProductName,

} from "./query.js"





export const save = async (product) => {
    const client = await getClient()
    try {
       await client.query("BEGIN")
        const arr = [product.products_img, product.products_name, product.products_price, product.products_category];
      const res = await  client.query(query.querySaveProduct,arr)
        await client.query("COMMIT")


        return res.rowCount > 0
    }
    catch (err){
        console.log(err.message)
        await client.query("ROLLBACK")
        throw err
    }
    finally {
        client.release()
    }

}

export const findByProductName = async (name) => {
    const client = await getClient()

    try {
        const res = await client.query(queryFindByProductName, [name])

        return res.rows
    }
    catch (err)
    {
        console.log(err.message)
        throw err
    }
    finally {
        client.release()
    }

}
export const findByCategory = async (category) => {
    const client = await getClient()
    try {
        const dataArr = await client.query(query.queryFindByCategory,[category])

            return dataArr.rows

    }
    catch (err){
        console.log(err.message)
        throw err
    }
    finally {
        client.release()
    }

}

export const findByProduct = async () => {
    const client = await getClient()
    try {

        const res = await client.query(query.queryFindByProducts)

        return res.rows
    }
    catch(err)
    {
        console.log(err.message)
        throw err
    }
    finally {
        client.release()
    }
}

export const updatePrice = async (price,productName) => {
    const client = await getClient()
    try {

        const result = await client.query(query.queryUpdatePrice,[price,productName])

       return result.rowCount > 0

    }
    catch (err)
    {
        console.log(err.message)
        throw err
    }
    finally {
        client.release()
    }
}


export const deleteByName = async (name) => {

    const client = await getClient()

    try {
        const result = await client.query(queryDeleteByName,[name])

        return result.rowCount > 0

    }
    catch (err)
    {
        console.log(err.message)
        throw err
    }
    finally {
        client.release()
    }
}

export const DeleteProduct = async () => {

    const client = await getClient()

    try {
         await client.query(queryDeleteProduct)

       return true
    }
    catch (err)
    {
        console.log(err.message)
        throw err
    }
    finally {
        await client.release()
    }
    return false
}
/// user

export const saveUser = async (user) => {

    const client = await getClient()

    try {

        const data = [user.users_name, user.users_password,user.users_role]
        await client.query("BEGIN")


        await client.query(query.querySaveUsers,data)

        await client.query("COMMIT")

        return true

    }
    catch (err)
    {
        console.log(err.message)
        await  client.query("ROLLBACK")
        throw err
    }
    finally {
        client.release()
    }
}

export const updateUserPassword = async (password,username) => {
    const client = await getClient()

    try {
        const result = await client.query(query.queryUpdateUsersPassword,[password,username])

        return result.rowCount > 0
    }
    catch (err)
    {
        console.log(err.message)
        throw err
    }
    finally {
        client.release()
    }

}

export const updateUserNameAndPassword = async (newName,password,name) => {

    const client = await getClient()
    try {

        const result = await client.query(query.queryUpdateUsersNameAndPassword,[newName, password,name])

        return result.rowCount > 0
    }
    catch (err) {
        console.log(err.message)
        throw err
    }
    finally {
        client.release()
    }
}
export const findByUserName = async (name) => {

    const client = await getClient()

    try {
        const res = await client.query(query.queryFindByName,[name])

        return res.rows
    }
    catch (err)
    {
        console.log(err.message)
        throw err

    }
    finally {
        client.release()
    }
}

export const deleteByUserName = async(name) => {

    const client = await getClient()

    try {
        const result = await client.query(query.queryDeleteByUserName,[name])

        return result.rowCount > 0
    }
    catch (err)
    {
        console.log(err.message)
        throw err
    }
    finally {
        client.release()
    }
}

export const DeleteByUser = async () =>{
    const client = await getClient()

    try {
        await client.query(query.queryDeleteByUser)
        return true
    }
    catch (err)
    {
        console.log(err.message)
        throw err
    }
    finally {
        client.release()
    }
    return false
}
//save ,findByProductName,findByCategory,findByProduct,updatePrice,updateProduct,deleteByName,DeleteProduct,saveUser,
// updateUserPassword,updateUserNameAndPassword,findByUserName
export default {save ,findByProductName,findByCategory,findByProduct,updatePrice,deleteByName,
    DeleteProduct,saveUser,updateUserPassword,updateUserNameAndPassword,findByUserName,deleteByUserName,DeleteByUser
}