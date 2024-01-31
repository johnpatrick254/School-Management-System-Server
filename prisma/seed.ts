import { PermissionType, UserType, PrismaClient, Course } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { hash } from 'bcrypt';
import { randomInt, randomUUID } from 'crypto';

const prisma = new PrismaClient();
const getGroupByNumber = (courses: {
  courses: {
    id: string;
  }[];
} & {
  id: string;
  code: string;
  name: string;
  cost: number;
}, groupNumber: number) => {
  const groupSize = Math.ceil(courses.courses.length / 4);
  const startIndex = (groupNumber - 1) * groupSize;
  const endIndex = Math.min(startIndex + groupSize, courses.courses.length);

  return courses.courses.slice(startIndex, endIndex);
}
const divideGroupIntoTwoSubgroups = (group: { id: string }[]) => {
  if (!group.length) {
    throw new Error("The group should have at least 1 course for further division.");
  }
  const firstSubgroupSize = Math.max(2, Math.floor(group.length / 2));
  const firstSubgroup = (group.length === 1) ? group : group.slice(0, firstSubgroupSize);
  const secondSubgroup = (group.length === 1) ? [] : group.slice(firstSubgroupSize);
  return [firstSubgroup, secondSubgroup];
}
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
        type: UserType.SUPER_ADMIN,
        surname: 'admin',
        email: 'super-admin@gmail.com',
        password: await hash('1234', 10),
        permissions: {
          connect: superAdminPermission,
        },
      },
    });

    // Admin
    for (let year = 1; year < 5; year++) {
      let currentYear = 2020;
      for (let number = 1; number < 10; number++) {
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        await prisma.admin.create({
          data: {
            code: `ADM-${number}-${year}`,
            name: firstName,
            type: UserType.ADMIN,
            surname: lastName,
            email: `${firstName}.${lastName}@gmail.com`,
            year: currentYear,
            password: await hash('1234', 10),
            permissions: {
              connect: adminPermission,
            },
          },
        });
      };
      currentYear++;

    };

    //Courses
    const numberOfCourses = 90
    const courses = []
    for (let index = 1; index < numberOfCourses; index++) {
      const techPrefix = faker.helpers.arrayElement(['Introduction to', 'Advanced', 'Mastering', 'Fundamentals of']);
      const techTopic = faker.helpers.arrayElement(['JavaScript', 'Python', 'React', 'Node.js', 'HTML', 'CSS', 'Machine Learning', 'Blockchain', 'Web Development', 'Data Science', 'Vue.js', 'Angular', 'Django', 'Express.js', 'MongoDB']);
      const techSuffix = faker.helpers.arrayElement(['Development', 'Programming', 'Engineering', 'Applications', 'Security', 'Cloud Computing', 'Mobile Apps', 'AI']);
      const courseName = `${techPrefix} ${techTopic} ${techSuffix}`
      courses.push(await prisma.course.create({
        data: {
          code: `${randomUUID()}-${techPrefix[0] + techTopic[0] + techSuffix[0]}`,
          name: courseName,

        }
      }))
    };

    //Career
    const careers = [
      {
        name: 'Frontend Software Development',
        code: 'FSD',
        cost: 20500,
        year: 2020
      },
      {
        name: 'Backend Software Development',
        code: 'BFD',
        cost: 31500,
        year: 2021
      },
      {
        name: 'Software Engineering',
        code: 'SFE',
        cost: 42000,
        year: 2022
      },
      {
        name: 'Cloud Engineering',
        code: 'CLE',
        cost: 32000,
        year: 2023
      },
      {
        name: 'Art and Language',
        code: 'AEL',
        cost: 13000,
        year: 2022
      },
      {
        name: 'Mechanical Engineering',
        code: 'MEE',
        cost: 13000,
        year: 2021
      },
      {
        name: 'Electrical Engineering',
        code: 'EEE',
        cost: 4200,
        year: 2024
      },
    ];

    const allCareers = careers.map(async (item) => {
      const count = 16
      const shuffledArray = faker.helpers.shuffle(courses);
      const careerCourses = shuffledArray.slice(0, count);

      return await prisma.career.create({
        data: {
          code: item.name,
          name: item.code,
          cost: item.cost,
          year: item.year,
          courses: {
            connect: [
              ...careerCourses.map(career => ({ id: career.id }))
            ]
          }
        },
      });
    }
    );

    let teacherCount = await prisma.teacher.count() + 1;
    allCareers.map(async (career) => {

      // Cohort
      for (let index = 1; index < 5; index++) {
        const cohort = await prisma.cohort.create({
          data: {
            code: `${(await career).code + "-" + (2020 + index)}`,
            careerId: (await career).id,
            year: (2020 + index)
          },
        });

        //semester
        const careerCourses = await prisma.career.findUnique(
          {
            where: {
              id: (await career).id
            },
            include: {
              courses: {
                select: {
                  id: true
                }
              }
            }
          }
        );
        const semesterCourses = getGroupByNumber(careerCourses, index)
        const semester1 = await prisma.semester.create({
          data: {
            academicYear: `${(2020 + index)}`,
            careerId: (await career).id,
            name: "FIRST SEMESTER",
            courses: {
              connect: [
                ...divideGroupIntoTwoSubgroups(semesterCourses)[0]
              ]
            }

          }
        })
        const semester2 = await prisma.semester.create({
          data: {
            academicYear: `${(2020 + index)}`,
            careerId: (await career).id,
            name: "SECOND SEMESTER",
            courses: {
              connect: [
                ...divideGroupIntoTwoSubgroups(semesterCourses)[1]
              ]
            }

          }
        })

        //Teacher
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const teacher1 = await prisma.teacher.create({
          data: {
            code: `${randomUUID()}-TCH-${teacherCount}-${(2020 + index)}`,
            type: UserType.TEACHER,
            name: firstName,
            year: (2020 + index),
            surname: lastName,
            email: `${firstName}.${lastName}@gmail.com`,
            password: await hash('1234', 10),
            permissions: {
              connect: teacherPermission,
            },
          },
        });
        if (teacher1) teacherCount++;

        const firstName2 = faker.person.firstName()
        const lastName2 = faker.person.lastName()
        const teacher2 = await prisma.teacher.create({
          data: {
            code: `${randomUUID()}-TCH-${(teacherCount)}-${(2020 + index + 4)}`,
            type: UserType.TEACHER,
            name: firstName2,
            surname: lastName2,
            year: (2020 + index),
            email: `${firstName2}.${lastName2}@gmail.com`,
            password: await hash('1234', 10),
            permissions: {
              connect: teacherPermission,
            },
          },
        });
        if (teacher2) teacherCount++;
        //section
        const sectionA = await prisma.section.create({
          data: {
            name: `${cohort.code}-A`,
            teacherId: teacher1.id,
            cohortId: cohort.id,
          },
        });
        const sectionB = await prisma.section.create({
          data: {
            name: `${cohort.code}-A`,
            teacherId: teacher2.id,
            cohortId: cohort.id,
          },
        });
        for (let x = 1; x < randomInt(50, 70); x++) {

          // Students
          const firstName = faker.person.firstName()
          const lastName = faker.person.lastName()
          const firstName2 = faker.person.firstName()
          const lastName2 = faker.person.lastName()
          const eoc = new Date(`1/12/${(2020 + index + 4)}`).toISOString();
          await prisma.student.create({
            data: {
              code: `${randomUUID()}-STD-${await prisma.student.count() + 1}`,
              type: UserType.STUDENT,
              name: firstName,
              surname: lastName,
              email: firstName + "." + lastName + randomInt(1, 100) + '@gmail.com',
              password: await hash('1234', 10),
              cohortId: cohort.id,
              EOC: eoc,
              sectionId: sectionA.id,
              permissions: {
                connect: studentPermission,
              },
            },
          });

          await prisma.student.create({
            data: {
              code: `${randomUUID()}-STD-${await prisma.student.count() + 1}`,
              type: UserType.STUDENT,
              name: firstName2,
              surname: lastName2,
              email: firstName2 + "." + lastName2 + randomInt(1, 100) + '@gmail.com',
              password: await hash('1234', 10),
              cohortId: cohort.id,
              EOC: eoc,
              sectionId: sectionB.id,
              permissions: {
                connect: studentPermission,
              },
            },
          });
        };
      };
    })
    // Accountant
    await prisma.accountant.create({
      data: {
        code: 'accountant-001',
        name: 'accountant',
        type: UserType.ACCOUNTANT,
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