export function lcdVaioValidate(body){
    if(!body.PNK === 'PNK0201'){
        throw new Error(`this PNK don't match with the 20 inch vaio lcd`)
    }
    return body
}