
export function ram8gbValidate(body){
    if(body.PNK === 'PNK0002'){
        throw new Error( 'this PNK is for a 16gb ram')
    }
    if(!body.PNK === 'PNK0001'){
        throw new Error(`this PNK don't match with this 8gb ram`)
    }


    return body
}