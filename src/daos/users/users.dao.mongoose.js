import { randomUUID } from "crypto";
import { model, Schema } from "mongoose";
import { hashPassword, isValidPwd } from "../../functions/bcrypt.js";

const usersSchema = new Schema({
    _id: { type: String, default: randomUUID },
    name: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    rol: {
        type: String,
        require: true,
        enum: ['admin', 'engineering', 'production_leader', 'assembly', 'logistics', 'repair']
    },
    last_connection: { type: String, default: 'null' }
},
    {
        strict: 'throw',
        versionKey: false,
        statics: {
            register: async function (body) {
                try {
                    let findEmail = await usersModel.findOne({ email: body.email })

                    if (findEmail) {
                        throw new Error('There is already an account with this email')
                    }

                    body.password = hashPassword(body.password)
                    await usersModel.create(body)
                } catch (error) {
                    throw new Error(error.message)
                }
            },
            login: async function (email, password) {
                try {
                    let userData

                    let findUser = await usersModel.findOne({ email: email })
                    if (!findUser) {
                        throw new Error('wrong email')
                    }

                    if (!isValidPwd(password, findUser)) {
                        throw new Error('wrong password')
                    }

                    userData = {
                        name: findUser.name,
                        lastName: findUser.lastName,
                        email: findUser.email,
                        rol: findUser.rol
                    }

                    return userData
                } catch (error) {
                    throw new Error(error.message)
                }
            },
            updateConnection: async function (user, date) {
                try {
                    if (!user) {
                        throw new Error(`user isn't logged`)
                    }
                    await usersModel.findOneAndUpdate({ email: user.email }, { $set: { last_connection: date } })
                }
                catch (error) {
                    throw new Error(error.message)
                }
            }
        }
    })

const usersModel = new model('Users', usersSchema)

class usersDaoMongoose {
    async register(body) {
        return await usersModel.register(body)
    }

    async login(email, password) {
        return await usersModel.login(email, password)
    }

    async updateLastConnection(user, date){
        return await usersModel.updateConnection(user, date)
    }
}

export async function getUsersDAO() {
    let usersDao
    return usersDao = new usersDaoMongoose
}