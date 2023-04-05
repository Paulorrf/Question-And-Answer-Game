-- AlterTable
ALTER TABLE "answer" ALTER COLUMN "is_correct" SET DEFAULT false;

-- CreateTable
CREATE TABLE "teste" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "teste_pkey" PRIMARY KEY ("id")
);
