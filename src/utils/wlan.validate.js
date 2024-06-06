
export function realtekWlanBoardValidate(body){

    if(!body.PNK === 'PNK0501'){
        throw new Error(`this PNK don't match with this wlan realtek board`)
    }

    return body
}