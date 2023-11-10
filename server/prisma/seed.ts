import { Permission, PermissionType, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Permissions
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

  // Super Admin
  await prisma.admin.create({
    data: {
      code: 'admin-001',
      name: 'super',
      surname: 'admin',
      email: 'super-admin@gmail.com',
      password: '1234',
      permissions: {
        connect: savedPermissions,
      },
    },
  });

  // Teacher
  const teacher = await prisma.teacher.create({
    data: {
      code: 'teacher-001',
      name: 'teacher',
      surname: '001',
      email: 'teacher-001@gmail.com',
      password: '1234',
      permissions: {
        connect: savedPermissions,
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
      code: 'JS-2023',
      name: 'JS Fundamentals',
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
      name: 'student',
      surname: '001',
      email: 'student-001@gmail.com',
      password: '1234',
      cohortId: cohort.id,
      EOC: eoc,
      sectionId: section.id,
      permissions: {
        connect: savedPermissions,
      },
    },
  });
};

seed();
