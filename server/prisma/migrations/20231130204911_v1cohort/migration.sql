/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Assignment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Career` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Cohort` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Exam` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Semester` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PermissionType" ADD VALUE 'VIEW_COHORT';
ALTER TYPE "PermissionType" ADD VALUE 'EDIT_COHORT';

-- AlterTable
ALTER TABLE "Accountant" ADD COLUMN     "year" INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM NOW());

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "year" INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM NOW());

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "year" INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM NOW());

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_code_key" ON "Assignment"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Career_code_key" ON "Career"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Cohort_code_key" ON "Cohort"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Exam_code_key" ON "Exam"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Semester_code_key" ON "Semester"("code");
