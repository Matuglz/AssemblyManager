export function baseCoverI5ForVaioValidate(body){
    if(!body.PNK === 'PNK0401'){
        throw new Error(`this PNK don't match with the base cover i5 for vaio model laptop`)
    }
    return body
}