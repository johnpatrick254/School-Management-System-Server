import { Permission, PermissionType, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

//////////////
//Permission//
//////////////
const seed = async () =>{
    //   prisma.$queryRaw``
    const permissions = ['EDIT_STUDENT','VIEW_STUDENT','CREATE_STUDENT','DELETE_STUDENT']
    const savedPermissions:Permission[] = []
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
///////////
//TEACHER//
/////////
const newTeacher =  await prisma.user.create({data:{
    name:"teacher ",
    surname:"1",
    email:"teacher-12@gmail.com",
    password:"1234",
    type:"TEACHER",
    permissions:{
        create:savedPermissions
    } 
}})
const teacher = await prisma.teacher.create({
    data:{
        code:"WEB-TS/01",    
        user:{
            create:newTeacher
        } 
    }
})

///////////
//Career//
/////////
const career = await prisma.career.create({
    data:{
        code:"JS-101",
        name:"JS Fundamentals",
        cost:10000, 
    }
})

///////////
//Cohort//
/////////
const cohort = await prisma.cohort.create({
    data:{
        code:"JS-2023",
        name:"JS Fundamentals",
        careerId:career.id
    }
})

////////////
//SECTION//
//////////
const section = await prisma.section.create({
    data:{
        name:"JS Fundamentals",
        teacherId:teacher.id,
        cohortId:cohort.id
    }
})

}
seed()