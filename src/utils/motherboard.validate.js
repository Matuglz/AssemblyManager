export function motherboardValidate(body){
    if(body.PNK === 'PNK0102'){
        throw new Error( 'this PNK is for i7 motherboard version')
    }
    if(!body.PNK === 'PNK0101'){
        throw new Error(`this PNK don't match with this i5 motherboard version`)
    }


    return body
}