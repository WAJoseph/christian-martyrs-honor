-- CreateEnum
CREATE TYPE "public"."Era" AS ENUM ('Apostolic', 'Patristic', 'Medieval', 'Modern');

-- CreateTable
CREATE TABLE "public"."Martyr" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "feastDay" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "era" "public"."Era" NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prayer" TEXT NOT NULL,

    CONSTRAINT "Martyr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChurchImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ChurchImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TimelineCentury" (
    "id" SERIAL NOT NULL,
    "century" TEXT NOT NULL,

    CONSTRAINT "TimelineCentury_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TimelineEntry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "centuryId" INTEGER NOT NULL,

    CONSTRAINT "TimelineEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Testimony" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimony_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Donation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL,
    "stripeSessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Donation_stripeSessionId_key" ON "public"."Donation"("stripeSessionId");

-- AddForeignKey
ALTER TABLE "public"."TimelineEntry" ADD CONSTRAINT "TimelineEntry_centuryId_fkey" FOREIGN KEY ("centuryId") REFERENCES "public"."TimelineCentury"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
