-- AlterTable
ALTER TABLE "public"."Martyr" ADD COLUMN     "iconDescription" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "intercessoryPrayer" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "story" TEXT NOT NULL DEFAULT '';
