import mongoose from "mongoose";

let models = mongoose.modelNames()
export async function findPartById(id) {
    let results = [];

    try {
        console.log(models);
        for (const model of models) {
            const result = await model.findOne({ partId: id });
            if (result) {
                results.push(result);
            }
        }

        return results;
    } catch (error) {
        throw error;
    }}