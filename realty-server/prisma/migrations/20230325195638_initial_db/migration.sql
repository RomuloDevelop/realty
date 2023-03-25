-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "password" TEXT,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRoles" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "UserRoles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Properties" (
    "id" SERIAL NOT NULL,
    "agentId" INTEGER,
    "description" TEXT NOT NULL,
    "area" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "address" TEXT NOT NULL,
    "mis_number" INTEGER NOT NULL,
    "zipCode" INTEGER NOT NULL,
    "baths" INTEGER NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "propertyType" INTEGER NOT NULL,
    "countyId" INTEGER NOT NULL,
    "provinceId" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,
    "neighbourhoodId" INTEGER NOT NULL,

    CONSTRAINT "Properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyTypes" (
    "id" SERIAL NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "PropertyTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyImages" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "PropertyImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provinces" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,

    CONSTRAINT "Provinces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Counties" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fipscode" TEXT NOT NULL,
    "stateAbbreviation" TEXT NOT NULL,

    CONSTRAINT "Counties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cities" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "countyFips" TEXT NOT NULL,
    "stateAbbreviation" TEXT NOT NULL,

    CONSTRAINT "Cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Neighbourhoods" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL,
    "countyFips" TEXT NOT NULL,
    "stateAbbreviation" TEXT NOT NULL,

    CONSTRAINT "Neighbourhoods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointments" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "agentId" INTEGER NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "comment" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,

    CONSTRAINT "Appointments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Provinces_abbreviation_key" ON "Provinces"("abbreviation");

-- CreateIndex
CREATE UNIQUE INDEX "Counties_fipscode_key" ON "Counties"("fipscode");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "UserRoles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_propertyType_fkey" FOREIGN KEY ("propertyType") REFERENCES "PropertyTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_countyId_fkey" FOREIGN KEY ("countyId") REFERENCES "Counties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "Cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_neighbourhoodId_fkey" FOREIGN KEY ("neighbourhoodId") REFERENCES "Neighbourhoods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyTypes" ADD CONSTRAINT "PropertyTypes_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "PropertyTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyImages" ADD CONSTRAINT "PropertyImages_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Counties" ADD CONSTRAINT "Counties_stateAbbreviation_fkey" FOREIGN KEY ("stateAbbreviation") REFERENCES "Provinces"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cities" ADD CONSTRAINT "Cities_countyFips_fkey" FOREIGN KEY ("countyFips") REFERENCES "Counties"("fipscode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Neighbourhoods" ADD CONSTRAINT "Neighbourhoods_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "Cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Neighbourhoods" ADD CONSTRAINT "Neighbourhoods_countyFips_fkey" FOREIGN KEY ("countyFips") REFERENCES "Counties"("fipscode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
