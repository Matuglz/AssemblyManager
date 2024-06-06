import { Schema, model } from "mongoose"
import { randomUUID } from "crypto"
import { realtekWlanBoardValidate } from "../../../utils/wlan.validate.js"



let realtekWlanBoardSchema = new Schema({
    _id: { type: String, require: true, default: randomUUID },
    name: { type: String, default: 'wifi and bluetooth board realtek' },
    universalPartId: {type: String, default:'REALTEK-WLAN-5GBPS-BLUETHTOOTH'},
    partId: { type: String, unique: true, require: true },
    PNK: { type: String, require: true },
    isAssambled: { type: Boolean, default: false },
    computerAssambledId: { type: String, require: true, default: 'This part is not assembled.' }
},
    {
        strict: 'throw',
        versionKey: false,
        statics: {
            createOne: async function (body) {
                try {
                    let wlanBoardBody = realtekWlanBoardValidate(body)
                    await realtekWlanBoardModel.create(wlanBoardBody)
                }
                catch (err){
                    throw new Error(err)
                }
            }
        }
    })

const realtekWlanBoardModel =new model('REALTEK-WLAN-BOARD', realtekWlanBoardSchema)

class realtekWlanBoardDaoMongoose {
    async create(body) {
        return await realtekWlanBoardModel.createOne(body)
    }
}


export async function getRealtekWlanBoardDAO() {
    let realtekWlanBoardDao
    return realtekWlanBoardDao = new realtekWlanBoardDaoMongoose
}