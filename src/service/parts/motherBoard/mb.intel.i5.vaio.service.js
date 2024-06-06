import { getMbIntelI5VaioDAO } from "../../../daos/parts/motherBoard/mb.intel.i5.vaio.dao.mongoose.js";

let mbIntelI5VaioDao = await getMbIntelI5VaioDAO()

class mbIntelI5VaioServices{
    depositOne(body){
        mbIntelI5VaioDao.create(body)
    }
}

export const mbIntelI5VaioService = new mbIntelI5VaioServices