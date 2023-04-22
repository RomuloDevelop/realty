/*
  Warnings:

  - You are about to drop the column `countyId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `provinceId` on the `Property` table. All the data in the column will be lost.
  - Added the required column `countyFipscode` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floors` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinceAbbreviation` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_countyId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_neighbourhoodId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_provinceId_fkey";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "countyId",
DROP COLUMN "provinceId",
ADD COLUMN     "countyFipscode" TEXT NOT NULL,
ADD COLUMN     "floors" INTEGER NOT NULL,
ADD COLUMN     "provinceAbbreviation" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "neighbourhoodId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_countyFipscode_fkey" FOREIGN KEY ("countyFipscode") REFERENCES "County"("fipscode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_provinceAbbreviation_fkey" FOREIGN KEY ("provinceAbbreviation") REFERENCES "Province"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_neighbourhoodId_fkey" FOREIGN KEY ("neighbourhoodId") REFERENCES "Neighbourhood"("id") ON DELETE SET NULL ON UPDATE CASCADE;
