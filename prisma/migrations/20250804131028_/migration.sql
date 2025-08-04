/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `Resource` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ResourceType" ADD VALUE 'POLICY_BRIEF';
ALTER TYPE "ResourceType" ADD VALUE 'HUMAN_RIGHTS_VIOLATIONS_REPORT';
ALTER TYPE "ResourceType" ADD VALUE 'REPORT_FOR_SEX_WORKERS';

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "imageUrl",
ADD COLUMN     "imagePath" TEXT;

-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "fileUrl",
ADD COLUMN     "filePath" TEXT,
ADD COLUMN     "imagePath" TEXT;

-- CreateTable
CREATE TABLE "GalleryImage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
);
