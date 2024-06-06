import { randomUUID } from "crypto"
import { Schema, model } from "mongoose"
import { prefix } from "../../utils/codes.generate.js"
import moment from "moment"
import { findPartById } from "../../utils/test2.js"



let vaioI5Schema = new Schema({
    _id: { type: String, required: true, default: randomUUID },
    name: { type: String, default: 'Vaio laptop, 8gb de ram, 480gb ssd, i5 12500k' },
    status: {
        type: String,
        default: 'Assembly',
        enum: ['Assembly', 'Testing', 'Injection', 'Palletized', 'Repair']
    },
    PNK: { type: String, default: 'PNK1001' },
    laptopCode: { type: String, unique: true, require: true },
    serialParts: {
        RAM: {

            universalId: { type: String, default: 'Memory_RAM_8GB_CORADIR' },
            status: { type: String, default: 'not assembled' },
            partCode: { type: String, default: 'NaN', ref: 'CORADIR-RAM-8GB', localField: 'partCode', foreingField: 'partId' }

        },
        Motherboard: {

            universalId: { type: String, default: 'MOTHERBOARD_GENERIC_FOR_VAIO_INTEL_I5_12500' },
            status: { type: String, default: 'not assembled' },
            partCode: { type: String, default: 'NaN', ref: 'MB-I5-VAIO', localField: 'partCode', foreingField: 'partId' }

        },
        LCD: {

            universalId: { type: String, default: 'LCD_IPS_20INCH_FOR_VAIO_LAPTOP' },
            status: { type: String, default: 'not assembled' },
            partCode: { type: String, default: 'NaN', ref: 'LCD-20INCH-VAIO', localField: 'partCode', foreingField: 'partId' }

        },
        baseCover: {

            universalId: { type: String, default: 'BASE-COVER-I5-WITH-KEYBOARD-TOUCHPAD-COOLER-AND-HEAT-SINK' },
            status: { type: String, default: 'not assembled' },
            partCode: { type: String, default: 'NaN', ref: 'BASE-COVER-I5-FOR-VAIO', localField: 'partCode', foreingField: 'partId' }

        },
        SSD: {

            universalId: { type: String, default: 'SSD-DISK-480GB-LEXAR' },
            status: { type: String, default: 'not assembled' },
            partCode: { type: String, default: 'NaN', ref: 'SSD-LEXAR-480GB', localField: 'partCode', foreingField: 'partId' }

        },
        WLAN: {
            universalId: { type: String, default: 'REALTEK-WLAN-5GBPS-BLUETHTOOTH' },
            status: { type: String, default: 'not assembled' },
            partCode: { type: String, default: 'NaN', ref: 'REALTEK-WLAN-BOARD', localField: 'partCode', foreingField: 'partId' }
        },
        Charger: {

            universalId: { type: String, default: 'GENERIC-CHARGER-19V' },
            status: { type: String, default: 'not assembled' },
        },
    },
    nonSerialParts: {
        Manual: {

            universalId: { type: String, default: 'MANUAL-FOR-VAIO-LAPTOP' },
            status: { type: String, default: 'not assembled' }

        },
        BOX: {
            universalId: { type: String, default: 'ASSEMBLED-BOX-FOR-VAIO-LAPTOP' },
            status: { type: String, default: 'not assembled' }

        },
        protectiveScreenCover: {
            universalId: { type: String, default: 'PROTECT-SCREEN-COVER-FOR-VAIO-LAPTOP' },
            status: { type: String, default: 'not assembled' }

        },
    },
    palletizingInformation: {
        type: Object,
        default: {
            palletCode: { type: Number, default: 'NaN' },
        }
    },
    statusTickets: { type: Array, default: [] },
    RepairTickets: { type: Array, default: [] },
    Licences: {
        windows: { type: Object, default: () => ({ status: 'not injected', userUpload: 'null', dateUsedLicence:'null' }) },
        office: { type: Object, default: () => ({ status: 'not injected', userUpload: 'null', dateUsedLicence:'null' }) }
    }
},
    {
        strict: 'throw',
        versionKey: false,
        statics: {
            generateOne: async function () {
                try {
                    let count = await vaioI5Model.countDocuments({})
                    count++
                    let weekOfYear = moment().week().toString().padStart(2, '0')
                    let prefix = `${weekOfYear}VAIO${count.toString().padStart(4, '0')}`
                    let caca = await vaioI5Model.create({ laptopCode: prefix })
                    console.log(caca, 'gola');
                }
                catch (err) {
                    throw new Error(err)
                }
            },

            assemblyPart: async function (body) {
                try {
                    console.log(body);
                    await findPartById(body.partId)
                        .then(results => {
                            console.log(results)
                        })

                }
                catch (err) {
                    throw new Error(err)
                }
            },
            checkStatus: async function (laptopCode, status) {
                let laptop = await vaioI5Model.findOne({ laptopCode: laptopCode })
                if (laptop.status!== status){
                    throw new Error(`The laptop status is ${laptop.status}`)
                }
            },

            checkLicencesStatus: async function(laptopCode, typeLicence){
                let laptop = await vaioI5Model.findOne({laptopCode:laptopCode})
                if(laptop.Licences[typeLicence].licence !== 'null'){
                    throw new Error('This licence is already charged')
                }
            },

            chargeLicence: async function (laptopCode, licence, userUpload, typeLicence) {
                let laptop = await vaioI5Model.findOne({ laptopCode: laptopCode })
                if (laptop.status !== 'Injection') {
                    throw new Error(`The laptop status is ${laptop.status}`)
                } else {
                    await vaioI5Model.updateOne({ laptopCode: laptopCode }, {
                        $set: {
                            [`Licences.${typeLicence}`]: {
                                licence: licence,
                                userUpload: userUpload,
                                dateUsedLicence:new Date().toString()
                            }
                        }
                    })
                }
            }

        }
    })

export const vaioI5Model = new model('LAPTOP-VAIO-I5', vaioI5Schema)

class laptopVaioI5DaoMongoose {
    async createOne() {
        return await vaioI5Model.generateOne()
    }

    async assemblyOnePart(body) {
        return await vaioI5Model.assemblyPart(body)
    }

    async consumeLicence(laptopCode, licence, userEmail) {
        return await vaioI5Model.chargeLicence(laptopCode, licence, userEmail)
    }

    async checkStatus(laptopCode, status){
        return await vaioI5Model.checkStatus(laptopCode, status)
    }

    async checkLicencesStatus(laptopCode, typeLicence){
        return await vaioI5Model.checkLicencesStatus(laptopCode, typeLicence)
    }

}


export async function getLatopVaioI5DAO() {
    let laptopVaioI5Dao
    return laptopVaioI5Dao = new laptopVaioI5DaoMongoose
}