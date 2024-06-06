export function generateAssemblyTicket(body, user, action){
    return{
        Date: Date.now().toString(),
        Action: action,
        PartId: body.partId,
        partName:body.partName,
        User: user
    }
}