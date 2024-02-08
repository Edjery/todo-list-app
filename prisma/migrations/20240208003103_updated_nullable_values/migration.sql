-- AlterTable
ALTER TABLE `dayinterval` MODIFY `sunday` BOOLEAN NULL,
    MODIFY `monday` BOOLEAN NULL,
    MODIFY `tuesday` BOOLEAN NULL,
    MODIFY `wednesday` BOOLEAN NULL,
    MODIFY `thursday` BOOLEAN NULL,
    MODIFY `friday` BOOLEAN NULL,
    MODIFY `saturday` BOOLEAN NULL;

-- AlterTable
ALTER TABLE `task` MODIFY `priority` BOOLEAN NULL,
    MODIFY `status` BOOLEAN NULL;

-- AlterTable
ALTER TABLE `timeinterval` MODIFY `daily` BOOLEAN NULL,
    MODIFY `weekly` BOOLEAN NULL,
    MODIFY `monthly` BOOLEAN NULL,
    MODIFY `yearly` BOOLEAN NULL;
