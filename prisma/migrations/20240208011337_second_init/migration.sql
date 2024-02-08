/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `TaskList` will be added. If there are existing duplicate values, this will fail.
  - Made the column `sunday` on table `dayinterval` required. This step will fail if there are existing NULL values in that column.
  - Made the column `monday` on table `dayinterval` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tuesday` on table `dayinterval` required. This step will fail if there are existing NULL values in that column.
  - Made the column `wednesday` on table `dayinterval` required. This step will fail if there are existing NULL values in that column.
  - Made the column `thursday` on table `dayinterval` required. This step will fail if there are existing NULL values in that column.
  - Made the column `friday` on table `dayinterval` required. This step will fail if there are existing NULL values in that column.
  - Made the column `saturday` on table `dayinterval` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `tag` required. This step will fail if there are existing NULL values in that column.
  - Made the column `priority` on table `task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `daily` on table `timeinterval` required. This step will fail if there are existing NULL values in that column.
  - Made the column `weekly` on table `timeinterval` required. This step will fail if there are existing NULL values in that column.
  - Made the column `monthly` on table `timeinterval` required. This step will fail if there are existing NULL values in that column.
  - Made the column `yearly` on table `timeinterval` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `dayinterval` MODIFY `sunday` BOOLEAN NOT NULL,
    MODIFY `monday` BOOLEAN NOT NULL,
    MODIFY `tuesday` BOOLEAN NOT NULL,
    MODIFY `wednesday` BOOLEAN NOT NULL,
    MODIFY `thursday` BOOLEAN NOT NULL,
    MODIFY `friday` BOOLEAN NOT NULL,
    MODIFY `saturday` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `tag` MODIFY `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `task` MODIFY `priority` BOOLEAN NOT NULL,
    MODIFY `status` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `timeinterval` MODIFY `daily` BOOLEAN NOT NULL,
    MODIFY `weekly` BOOLEAN NOT NULL,
    MODIFY `monthly` BOOLEAN NOT NULL,
    MODIFY `yearly` BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `TaskList_name_key` ON `TaskList`(`name`);
