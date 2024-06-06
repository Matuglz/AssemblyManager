import { randomUUID } from "crypto";
import { Schema, model } from "mongoose";
import { lcdVaioValidate } from "../../../utils/lcd.validate.js";


const baseCoverI5ForVaioSchema = new Schema({
    _id: { type: String, required: true, default: randomUUID },
    universalPartId: {type: String, default:'BASE-COVER-I5-WITH-KEYBOARD-TOUCHPAD-COOLER-AND-HEAT-SINK'},
    partId: { type: String, required: true, unique:true },
    name: { type: String, default: 'Base cover i5 for vaio' },
    PNK: { type: String, required: true },
    isAssambled: { type: Boolean, default: false },
    computerAssambledId: { type: String, default: 'This part is not assembled' },
}, {
    strict: 'throw',
    versionKey: false,
    statics: {
        createOne: async function (body) {
            try {
                //let baseCoverI5ForVaioBody = lcdVaioValidate(body)
                await baseCoverI5ForVaioModel.create(body)
            }
            catch(error) {
                throw new Error(error.message)
            }
        }
    }
})

const baseCoverI5ForVaioModel = new model('BASE-COVER-I5-FOR-VAIO', baseCoverI5ForVaioSchema)

class baseCoverI5VaioDaoMONGOOSE{
    async create(body){
        await baseCoverI5ForVaioModel.createOne(body)
    }
}

export async function getBaseCoverI5VaioDAO(){
    let baseCoverI5VaioDao
    return baseCoverI5VaioDao = new baseCoverI5VaioDaoMONGOOSE
}