import { getBaseCoverI5VaioDAO } from "../../../daos/parts/base/base..i5.vaio.dao.mongoose.js";

const BaseCoverI5VaioDAO = await getBaseCoverI5VaioDAO()

class baseCoverI5ForVaioServices {
    async depositOne(body){
        return await BaseCoverI5VaioDAO.create(body)
    }
}

export const baseCoverI5ForVaioService = new baseCoverI5ForVaioServices