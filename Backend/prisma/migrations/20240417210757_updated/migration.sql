/*
  Warnings:

  - You are about to drop the column `liked` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "liked",
ADD COLUMN     "userlikes" TEXT[];
