import { Schema, model } from "mongoose"
import { ram8gbValidate } from "../../../utils/ram.validate.js"
import { randomUUID } from "crypto"



let coradirRam8gbSchema = new Schema({
    _id: { type: String, require: true, default: randomUUID },
    name: { type: String, default: 'RAM Coradir 8gb' },
    universalPartId: {type: String, default:'Memory_RAM_8GB_CORADIR'},
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
                    let ramBody = ram8gbValidate(body)
                    await ram8gbCoradirManager.create(ramBody)
                }
                catch (err){
                    throw new Error(err)
                }
            }
        }
    })

const ram8gbCoradirManager =new model('CORADIR-RAM-8GB', coradirRam8gbSchema)

class ram8gbCoradirDaoMONGOOSE {
    async create(body) {
        return await ram8gbCoradirManager.createOne(body)
    }
}


export async function getRam8gbCoradirDAO() {
    let ram8gbCoradirDao
    return ram8gbCoradirDao = new ram8gbCoradirDaoMONGOOSE
}