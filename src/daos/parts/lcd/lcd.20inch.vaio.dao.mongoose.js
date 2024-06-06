import { randomUUID } from "crypto";
import { Schema, model } from "mongoose";
import { lcdVaioValidate } from "../../../utils/lcd.validate.js";


const lcd20InchVaioSchema = new Schema({
    _id: { type: String, required: true, default: randomUUID},
    universalPartId: {type: String, default:'LCD_IPS_20INCH_FOR_VAIO_LAPTOP'},
    partId: { type: String, required: true, unique:true },
    name: { type: String, default: 'LCD 20inch for vaio' },
    PNK: { type: String, required: true },
    isAssambled: { type: Boolean, default: false },
    computerAssambledId: { type: String, default: 'This part is not assembled' },
}, {
    strict: 'throw',
    versionKey: false,
    statics: {
        createOne: async function (body) {
            try {
                //let lcd20InchBody = lcdVaioValidate(body)
                await lcd20InchVaioModel.create(body)
            }
            catch(error) {
                throw new Error(error.message)
            }
        }
    }
})

const lcd20InchVaioModel = new model('LCD-20INCH-VAIO', lcd20InchVaioSchema)

class lcd20InchVaioDaoMONGOOSE{
    async create(body){
        await lcd20InchVaioModel.createOne(body)
    }
}

export async function getLcd20InchVaioDAO(){
    let lcd20InchVaioDao
    return lcd20InchVaioDao = new lcd20InchVaioDaoMONGOOSE
}