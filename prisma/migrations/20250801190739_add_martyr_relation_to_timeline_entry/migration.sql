-- AlterTable
ALTER TABLE "public"."TimelineEntry" ADD COLUMN     "martyrId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."TimelineEntry" ADD CONSTRAINT "TimelineEntry_martyrId_fkey" FOREIGN KEY ("martyrId") REFERENCES "public"."Martyr"("id") ON DELETE SET NULL ON UPDATE CASCADE;
