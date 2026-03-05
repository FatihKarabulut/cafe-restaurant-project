import repo, {findByProductName} from './repository.js'

import {expect} from 'chai'

import {getUsers, getProducts} from "./getProductAndUserArrayJson.js";
import service from "../dataService/service.js";

const SaveProductDbTestService = async () => {

    try {
        const arr = await getProducts();

        for (const i of arr) {
            expect(await repo.save(i)).to.be.true
        }
    } catch (error) {
        console.log(error.message)
    }


}

const findByProductNameTestService = async () => {

    const arr = await repo.findByProductName("Çay")
     expect(arr).to.not.be.empty

}

const findByCategoryTestService = async () => {
    const arr = await repo.findByCategory("hot")
    expect(arr).to.not.be.empty
}

const findByProductService = async () => {
    const arr = await repo.findByProduct()

    expect(arr).to.not.be.empty



}
const updatePriceTestService = async () => {

    expect(await repo.updatePrice(11.50,"Çay")).to.be.true

}




const deleteByNameTestService = async () => {

    expect(await repo.deleteByName("Çay")).to.be.true
}

const DeleteProductTestService = async () => {

    expect(await repo.DeleteProduct()).to.be.true


}

const saveUserTestService = async () => {

    const arr = await getUsers()

    for (const i of arr)
    {
        expect(await service.saveUser(i)).to.be.true
    }
}

const updateUserTestService = async () => {

    expect(await repo.updateUserPassword(7272,"fatih"))
}
const updateUserNameAndPasswordTestService = async () => {
    expect(await repo.updateUserNameAndPassword("hikmet",7272,"ahmet")).to.be.true
}
const findByUserNameTestService = async () => {
    const arr = await repo.findByUserName("fatih")
    expect(arr).to.not.be.empty
}

const deleteByUserNameTestService = async () => {

    expect(await repo.deleteByUserName("ayse")).to.be.true

    const arr = await repo.findByUserName("ayse")

    expect(arr).to.be.empty
}

const DeleteByUserTestService = async () => {
    expect(await repo.DeleteByUser()).to.be.true
}

const createTest = () => {



    before("DeleteUserAndProductService", async() => {
        await DeleteProductTest()
        await DeleteByUserTest()
    })


    it("save productService", async () => await SaveProductDbTest())

    it("findByProductNameService True test", async () => await findByProductNameTest())
    it("findByCategoryTestService True test", async () => await findByCategoryTest())
    it("findByProductService True test", async () => await findByProduct())

    it("updatePriceTestService True test", async () => await updatePriceTest())


   it("DeleteByNameService True test", async () => await deleteByNameTest())




    /// User
    it("SaveUser TrueService test", async () => await saveUserTest())
    it("UpdateUser TrueService test", async () => await updateUserTest())
    it("updateUserNameAndPasswordTestService true test", async () => await updateUserNameAndPasswordTest())
    it("findByUserNameTestService true test", async () => await findByUserNameTest())

    it("deleteByUserNameTestService true test", async() => await deleteByUserNameTest())




}
describe('Service Test', createTest)