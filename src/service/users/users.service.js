import { getUsersDAO } from "../../daos/users/users.dao.mongoose.js";

const usersDao = await getUsersDAO()

class usersServices{
    async register(body){
        return await usersDao.register(body)
    }

    async login(email, password){
        return await usersDao.login(email, password)
    }

    async updateLastConnection(user, date){
        return await usersDao.updateLastConnection(user, date)
    }
}

export const usersService = new usersServices