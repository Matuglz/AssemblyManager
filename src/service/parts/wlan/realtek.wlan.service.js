import { getRealtekWlanBoardDAO } from "../../../daos/parts/wlan/realtek.wlan.adapter.dao.mongoose.js";

let realtekWlanBoardDAO =await getRealtekWlanBoardDAO()

class realtekWlanBoardServices{
    async depositOne(body){
        return await realtekWlanBoardDAO.create(body)
    }
}

export const realtekWlanBoardService = new realtekWlanBoardServices