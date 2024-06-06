import { getLcd20InchVaioDAO } from "../../../daos/parts/lcd/lcd.20inch.vaio.dao.mongoose.js";

const lcd20InchVaioDao = await getLcd20InchVaioDAO()

class lcd20InchVaioServices{
    async depositOne(body){
        return lcd20InchVaioDao.create(body)
    }
}

export const lcd20InchVaioService = new lcd20InchVaioServices 