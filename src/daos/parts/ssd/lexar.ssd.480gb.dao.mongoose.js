import { Schema, model } from "mongoose"
import { randomUUID } from "crypto"
import { ssdLexar480gbValidate } from "../../../utils/ssd.validate.js"



let ssd480GBSchema = new Schema({
    _id: { type: String, require: true, default: randomUUID },
    name: { type: String, default: 'SSD lexar 480gb' },
    universalPartId: {type: String, default:'SSD-DISK-480GB-LEXAR'},
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
                    let ssd480gbBody = ssdLexar480gbValidate(body)
                    await ssdLexar480gbModel.create(ssd480gbBody)
                }
                catch (err){
                    throw new Error(err)
                }
            }
        }
    })

const ssdLexar480gbModel =new model('SSD-LEXAR-480GB', ssd480GBSchema)

class ssdLexar480gbDaoMongoose {
    async create(body) {
        return await ssdLexar480gbModel.createOne(body)
    }
}


export async function getLexar480gbDAO() {
    let lexar480gbDao
    return lexar480gbDao = new ssdLexar480gbDaoMongoose
}