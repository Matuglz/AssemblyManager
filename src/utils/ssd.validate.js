
export function ssdLexar480gbValidate(body){
    if(body.PNK === 'PNK0302'){
        throw new Error( 'this PNK is for a 240gb ssd disk')
    }
    if(!body.PNK === 'PNK0301'){
        throw new Error(`this PNK don't match with this lexar 480gb disk`)
    }

    return body
}