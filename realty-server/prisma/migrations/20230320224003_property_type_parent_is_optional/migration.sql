-- DropForeignKey
ALTER TABLE "PropertyTypes" DROP CONSTRAINT "PropertyTypes_parentId_fkey";

-- AlterTable
ALTER TABLE "PropertyTypes" ALTER COLUMN "parentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PropertyTypes" ADD CONSTRAINT "PropertyTypes_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "PropertyTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
