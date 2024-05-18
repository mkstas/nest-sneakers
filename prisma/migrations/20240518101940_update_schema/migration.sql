/*
  Warnings:

  - The values [recieved] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `good_id` on the `orders` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "GoodStatus" AS ENUM ('active', 'hidden');

-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('active', 'received', 'rejected');
ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'active';
COMMIT;

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_good_id_fkey";

-- DropIndex
DROP INDEX "orders_good_id_key";

-- AlterTable
ALTER TABLE "goods" ADD COLUMN     "status" "GoodStatus" NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "good_id";

-- CreateTable
CREATE TABLE "OrderGood" (
    "orderId" INTEGER NOT NULL,
    "goodId" INTEGER NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderGood_pkey" PRIMARY KEY ("orderId","goodId")
);

-- AddForeignKey
ALTER TABLE "OrderGood" ADD CONSTRAINT "OrderGood_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderGood" ADD CONSTRAINT "OrderGood_goodId_fkey" FOREIGN KEY ("goodId") REFERENCES "goods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
