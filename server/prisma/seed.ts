import { PermissionType,UserType, PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
const prisma = new PrismaClient();

// Permissions
const seed = async () => {
  try {
    const permissions = [
      { type: PermissionType.DELETE_STUDENT },
      { type: PermissionType.VIEW_STUDENT },
      { type: PermissionType.DELETE_TEACHER },
      { type: PermissionType.VIEW_TEACHER },
      { type: PermissionType.VIEW_ADMIN },
      { type: PermissionType.DELETE_ADMIN },
      { type: PermissionType.VIEW_ACCOUNTANT },
      { type: PermissionType.DELETE_ACCOUNTANT },
      { type: PermissionType.DELETE_COHORT },
      { type: PermissionType.VIEW_COHORT },
      { type: PermissionType.SUPER_ADMIN },
      { type: PermissionType.CREATE_STAFF },
      { type: PermissionType.CREATE_CAREER },
      { type: PermissionType.VIEW_CAREER },
      { type: PermissionType.DELETE_CAREER },
      { type: PermissionType.UPDATE_CAREER },
      { type: PermissionType.CREATE_SECTION },
      { type: PermissionType.VIEW_SECTION },
      { type: PermissionType.DELETE_SECTION },
      { type: PermissionType.CREATE_COURSE },
      { type: PermissionType.UPDATE_COURSE },
      { type: PermissionType.VIEW_COURSE },
      { type: PermissionType.DELETE_COURSE },
      { type: PermissionType.CREATE_SEMESTER },
      { type: PermissionType.UPDATE_SEMESTER },
      { type: PermissionType.VIEW_SEMESTER },
    ];

    const createdPermission = await prisma.permission.createMany({
      data: permissions,
      skipDuplicates: true,
    });
    console.log(createdPermission);

    const superAdminPermission = await prisma.permission.findMany();
    const adminPermission = await prisma.permission.findMany({
      where: { NOT: { type: 'SUPER_ADMIN' } },
    });
    const teacherPermission = await prisma.permission.findMany({
      where: {
        type: {
          in: [
            'VIEW_STUDENT',
            'VIEW_TEACHER',
            'VIEW_COHORT',
            'VIEW_SECTION',
            'VIEW_SEMESTER',
            'VIEW_COURSE',
          ],
        },
      },
    });
    const accountantPermission = await prisma.permission.findMany({
      where: { type: { in: ['VIEW_ACCOUNTANT'] } },
    });
    const studentPermission = await prisma.permission.findMany({
      where: {
        type: {
          in: [
            'VIEW_STUDENT',
            'VIEW_CAREER',
            'VIEW_COHORT',
            'VIEW_SECTION',
            'VIEW_SEMESTER',
            'VIEW_COURSE',
          ],
        },
      },
    });

    // Super Admin
    await prisma.admin.create({
      data: {
        code: 'super-admin-001',
        name: 'super',
        type:UserType.SUPER_ADMIN,
        surname: 'admin',
        email: 'super-admin@gmail.com',
        password: await hash('1234', 10),
        permissions: {
          connect: superAdminPermission,
        },
      },
    });

    // Admin
    await prisma.admin.create({
      data: {
        code: 'admin-001',
        name: 'admin',
        type:UserType.ADMIN,
        surname: 'admin',
        email: 'admin@gmail.com',
        password: await hash('1234', 10),
        permissions: {
          connect: adminPermission,
        },
      },
    });

    // Teacher
    const teacher = await prisma.teacher.create({
      data: {
        code: 'teacher-001',
        type:UserType.TEACHER ,
        name: 'teacher',
        surname: '001',
        email: 'teacher-001@gmail.com',
        password: await hash('1234', 10),
        permissions: {
          connect: teacherPermission,
        },
      },
    });

    // Career
    const career = await prisma.career.create({
      data: {
        code: 'JS-101',
        name: 'JS Fundamentals',
        cost: 10000,
      },
    });

    // Cohort
    const cohort = await prisma.cohort.create({
      data: {
        code: 'JS',
        careerId: career.id,
      },
    });

    // Section
    const section = await prisma.section.create({
      data: {
        name: 'JS Fundamentals',
        teacherId: teacher.id,
        cohortId: cohort.id,
      },
    });

    // Student
    const eoc = new Date('1/12/2024').toISOString();
    await prisma.student.create({
      data: {
        code: 'student-001',
        type:UserType.STUDENT,
        name: 'student',
        surname: '001',
        email: 'student-001@gmail.com',
        password: await hash('1234', 10),
        cohortId: cohort.id,
        EOC: eoc,
        sectionId: section.id,
        permissions: {
          connect: studentPermission,
        },
      },
    });

    // Accountant
    await prisma.accountant.create({
      data: {
        code: 'accountant-001',
        name: 'accountant',
        type:UserType.ACCOUNTANT,
        surname: '001',
        email: 'accountant-001@gmail.com',
        password: await hash('1234', 10),
        permissions: {
          connect: accountantPermission,
        },
      },
    });
  } catch (error) {
    console.log(error);

  } finally {
    prisma.$disconnect();

  }
};

seed();