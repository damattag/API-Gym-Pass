/*
  Warnings:

  - Made the column `gym_id` on table `check_ins` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "check_ins" DROP CONSTRAINT "check_ins_gym_id_fkey";

-- AlterTable
ALTER TABLE "check_ins" ALTER COLUMN "gym_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
