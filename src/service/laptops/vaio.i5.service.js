import { getLatopVaioI5DAO } from "../../daos/vaio/vaio.dao.mongoose.js";

let laptopVaioI5Dao =  await getLatopVaioI5DAO()

class laptopVaioI5Services {
    async createOne(){
       return await laptopVaioI5Dao.createOne()
    }

    async caca(body){
        return await laptopVaioI5Dao.assemblyOnePart(body)
    }

    async chargeLicence(laptopCode, licence, userEmail){
        return await laptopVaioI5Dao.consumeLicence(laptopCode, licence, userEmail)
    }

    async checkStatus(laptopCode, status){
        return await laptopVaioI5Dao.checkStatus(laptopCode, status)
    }

    async checkLicencesStatus(laptopCode, typeLicence){
        return await laptopVaioI5Dao.checkLicencesStatus(laptopCode, typeLicence)
    }
}

export const laptopVaioI5Service = new laptopVaioI5Services