/*
  Warnings:

  - You are about to drop the `timeinterval` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `timeinterval` DROP FOREIGN KEY `TimeInterval_taskId_fkey`;

-- AlterTable
ALTER TABLE `task` ADD COLUMN `timeInterval` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `timeinterval`;
