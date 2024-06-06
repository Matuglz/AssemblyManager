import { randomUUID } from "crypto";
import { Schema, model } from "mongoose";
import { motherboardValidate } from "../../../utils/motherboard.validate.js";


const mbIntelI5VaioSchema = new Schema({
    _id: { type: String, required: true, default: randomUUID },
    universalPartId: {type: String, default:'MOTHERBOARD_GENERIC_FOR_VAIO_INTEL_I5_12500'},
    partId: { type: String, required: true },
    name: { type: String, default: 'motherboard intel i5 for vaio' },
    PNK: { type: String, required: true },
    isAssambled: { type: Boolean, default: false },
    computerAssambledId: { type: String, default: 'This part is not assembled' },
}, {
    strict: 'throw',
    versionKey: false,
    statics: {
        createOne: async function (body) {
            try {
                let mbI5Body = motherboardValidate(body)
                await mbIntelI5VaioModel.create(mbI5Body)
            }
            catch(error) {
                throw new Error(error.message)
            }
        }
    }
})

const mbIntelI5VaioModel = new model('MB-I5-VAIO', mbIntelI5VaioSchema)

class mbIntelI5DaoMONGOOSE{
    async create(body){
        await mbIntelI5VaioModel.createOne(body)
    }
}

export async function getMbIntelI5VaioDAO(){
    let mbIntelI5VaioDao
    return mbIntelI5VaioDao = new mbIntelI5DaoMONGOOSE
}