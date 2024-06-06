import { getLexar480gbDAO } from "../../../daos/parts/ssd/lexar.ssd.480gb.dao.mongoose.js";

const Lexar480gbDAO = await getLexar480gbDAO()

class lexar480gbServices {
    async depositOne(body){
        return await Lexar480gbDAO.create(body)
    }
}

export const lexar480gbService = new lexar480gbServices