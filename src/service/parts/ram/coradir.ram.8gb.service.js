
import { getRam8gbCoradirDAO } from "../../../daos/parts/ram/coradir.ram.8gb.dao.mongoose.js";
import { ram8gbValidate } from "../../../utils/ram.validate.js";

let ram8gbCoradirDao = await getRam8gbCoradirDAO()

class ram8gbCoradirServices{
    async depositOne(body){
        return await ram8gbCoradirDao.create(body)
    }

}

export let ram8gbCoradirService = new ram8gbCoradirServices