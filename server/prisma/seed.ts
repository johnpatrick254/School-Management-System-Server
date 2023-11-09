import { Permission, PermissionType, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//////////////
//Permission//
//////////////
const seed = async () => {
  const permissions = [
    'EDIT_STUDENT',
    'VIEW_STUDENT',
    'CREATE_STUDENT',
    'DELETE_STUDENT',
  ];
  const savedPermissions: Permission[] = [];
  permissions.map(async (permission: PermissionType) => {
    const createdPermission = await prisma.permission.create({
      data: { type: permission },
    });
    savedPermissions.push(createdPermission);
  });

  ///////////////
  //Super Admin//
  ///////////////
  await prisma.user.create({
    data: {
      name: 'super',
      surname: 'admin',
      email: 'super-admin@gmail.com',
      password: '1234',
      type: 'ADMIN',
      permissions: {
        connect: savedPermissions,
      },
    },
  });

  ///////////
  //TEACHER//
  ///////////
  const newUserTeacher = await prisma.user.create({
    data: {
      name: 'teacher',
      surname: '1',
      email: 'teacher-12@gmail.com',
      password: '1234',
      type: 'TEACHER',
      permissions: {
        connect: savedPermissions,
      },
    },
  });

  const teacher = await prisma.teacher.create({
    data: {
      code: 'WEB-TS/01',
      userId: newUserTeacher.id,
    },
  });

  ///////////
  //Career//
  /////////
  const career = await prisma.career.create({
    data: {
      code: 'JS-101',
      name: 'JS Fundamentals',
      cost: 10000,
    },
  });

  ///////////
  //Cohort//
  /////////
  const cohort = await prisma.cohort.create({
    data: {
      code: 'JS-2023',
      name: 'JS Fundamentals',
      careerId: career.id,
    },
  });

  ////////////
  //SECTION//
  //////////
  const section = await prisma.section.create({
    data: {
      name: 'JS Fundamentals',
      teacherId: teacher.id,
      cohortId: cohort.id,
    },
  });

  ////////////
  //STUDENT//
  //////////
  const newUserStudent = await prisma.user.create({
    data: {
      name: 'student',
      surname: '1',
      email: 'student-12@gmail.com',
      password: '1234',
      type: 'STUDENT',
      permissions: {
        connect: savedPermissions,
      },
    },
  });
  const eoc = new Date('1/12/2024').toISOString();
  const student = await prisma.student.create({
    data: {
      code: 'WEBDEV/STU/001',
      cohortId: cohort.id,
      EOC: eoc,
      sectionId: section.id,
      userId: newUserStudent.id,
    },
  });
};

seed();
