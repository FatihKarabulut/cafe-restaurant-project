import service from "./service.js"
import {expect} from "chai";
import {getTestUsers} from "./getUserArrayJson.js"



const saveUserServices = async () => {

    const arr = getTestUsers()

    for (const user of arr) {

        expect(await service.saveUserService(user)).to.be.true
    }

}


const runDataServiceTest = async () => {

    before("DeleteAllUsers", async () => {

        expect(await service.DeleteByUserService()).to.be.true
    })

    it("should hash password before saving user", async () => await saveUserServices())

    it("exists username and password", async () => {

        expect(await service.loginUser("john_doe","123456")).to.be.true
    })

    it("false username and password", async () => {

        expect(await service.loginUser("john_doe","1234567")).to.be.false
    })



}

describe("Data Service Test",async () => await runDataServiceTest())