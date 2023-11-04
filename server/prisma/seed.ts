import { Permission, PermissionType, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

//////////////
//Permission//
//////////////
const seed = async () =>{

    const permissions = ['EDIT_STUDENT','VIEW_STUDENT','CREATE_STUDENT','DELETE_STUDENT']
    const savedPermissions = []
    permissions.map(async (permission:PermissionType) => {
        const createdPermission =  await prisma.permission.create({ data: { type:permission } })
        savedPermissions.push(createdPermission)
    })
    
///////////////
//Super Admin//
///////////////
    
    await prisma.user.create({data:{
        name:"super",
        surname:"admin",
        email:"super-admin@gmail.com",
        password:"1234",
        type:"ADMIN",
        permissions:{
            create:savedPermissions
        } 
    }})
}
