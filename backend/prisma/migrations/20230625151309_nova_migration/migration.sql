/*
  Warnings:

  - You are about to drop the column `description` on the `answer` table. All the data in the column will be lost.
  - You are about to drop the column `dexterity` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `intelligence` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `luck` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `strenght` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `vitality` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `question` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `question` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `question` table. All the data in the column will be lost.
  - You are about to alter the column `body` on the `question` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `question_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teste` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_info` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `classe_id` to the `character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_id` to the `character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description_right_answer` to the `question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question_set_id` to the `question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_data_id` to the `question` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "situation" AS ENUM ('active', 'inactive', 'deleted');

-- CreateEnum
CREATE TYPE "races" AS ENUM ('elfo', 'humano', 'orc');

-- CreateEnum
CREATE TYPE "classe_opt" AS ENUM ('orc', 'elfo', 'humano');

-- DropForeignKey
ALTER TABLE "question" DROP CONSTRAINT "question_user_id_fkey";

-- DropForeignKey
ALTER TABLE "question_tags" DROP CONSTRAINT "question_tags_question_id_fkey";

-- DropForeignKey
ALTER TABLE "question_tags" DROP CONSTRAINT "question_tags_tags_id_fkey";

-- DropForeignKey
ALTER TABLE "user_info" DROP CONSTRAINT "user_info_character_id_fkey";

-- AlterTable
ALTER TABLE "answer" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "character" DROP COLUMN "dexterity",
DROP COLUMN "intelligence",
DROP COLUMN "level",
DROP COLUMN "luck",
DROP COLUMN "strenght",
DROP COLUMN "vitality",
ADD COLUMN     "classe_id" INTEGER NOT NULL,
ADD COLUMN     "status_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "question" DROP COLUMN "difficulty",
DROP COLUMN "rating",
DROP COLUMN "user_id",
ADD COLUMN     "description_right_answer" VARCHAR(255) NOT NULL,
ADD COLUMN     "question_set_id" INTEGER NOT NULL,
ADD COLUMN     "situation" "situation" NOT NULL DEFAULT 'active',
ADD COLUMN     "user_data_id" INTEGER NOT NULL,
ALTER COLUMN "body" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "question_tags";

-- DropTable
DROP TABLE "tags";

-- DropTable
DROP TABLE "teste";

-- DropTable
DROP TABLE "user_info";

-- CreateTable
CREATE TABLE "question_set" (
    "id" SERIAL NOT NULL,
    "answered_number" INTEGER DEFAULT 0,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "rating" INTEGER DEFAULT 1,
    "difficulty" "difficulty",
    "situation" "situation" NOT NULL DEFAULT 'active',
    "question_number" INTEGER,

    CONSTRAINT "question_set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" SERIAL NOT NULL,
    "nome" "races" NOT NULL,
    "status_id" INTEGER,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history_answered_question" (
    "id" SERIAL NOT NULL,
    "user_data_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "chosen_answer_id" INTEGER NOT NULL,
    "portal_spec_id" INTEGER NOT NULL,

    CONSTRAINT "history_answered_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history_answered_set_question" (
    "id" SERIAL NOT NULL,
    "user_data_id" INTEGER NOT NULL,
    "question_set_id" INTEGER NOT NULL,

    CONSTRAINT "history_answered_set_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portal" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "portal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portal_spec" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "portal_id" INTEGER NOT NULL,

    CONSTRAINT "portal_spec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_set_tag" (
    "question_set_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "question_set_tag_pkey1" PRIMARY KEY ("question_set_id","tag_id")
);

-- CreateTable
CREATE TABLE "status" (
    "id" SERIAL NOT NULL,
    "strength" INTEGER NOT NULL DEFAULT 1,
    "intelligence" INTEGER NOT NULL DEFAULT 1,
    "agility" INTEGER NOT NULL DEFAULT 1,
    "luck" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token" (
    "id" SERIAL NOT NULL,
    "access_tk" VARCHAR(255),
    "referesh_tk" VARCHAR(255),

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_data" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "nivel" INTEGER NOT NULL DEFAULT 1,
    "character_id" INTEGER NOT NULL,
    "tokens_id" INTEGER NOT NULL,
    "display_name" VARCHAR(255),
    "password" VARCHAR(255),
    "experience" INTEGER NOT NULL DEFAULT 0,
    "status_point_remain" INTEGER DEFAULT 0,

    CONSTRAINT "user_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_right_answer" (
    "count" INTEGER DEFAULT 0,
    "user_data_id" INTEGER NOT NULL,
    "portal_spec_id" INTEGER NOT NULL,

    CONSTRAINT "user_right_answer_pkey" PRIMARY KEY ("user_data_id","portal_spec_id")
);

-- CreateTable
CREATE TABLE "portal_spec_primary" (
    "portal_spec_id" INTEGER NOT NULL,
    "portal_id" INTEGER NOT NULL,
    "comp_key" INTEGER NOT NULL,

    CONSTRAINT "portal_spec_primary_pkey" PRIMARY KEY ("portal_spec_id","portal_id")
);

-- CreateTable
CREATE TABLE "portal_requirements" (
    "id" SERIAL NOT NULL,
    "portal_name" VARCHAR(255) NOT NULL,
    "difficulty" VARCHAR(50) NOT NULL,
    "intelligence_required" INTEGER NOT NULL,
    "strength_required" INTEGER NOT NULL,
    "luck_required" INTEGER NOT NULL,
    "agility_required" INTEGER NOT NULL,

    CONSTRAINT "portal_requirements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nome_classe" ON "classes"("nome");

-- CreateIndex
CREATE INDEX "portal_idx" ON "portal"("name");

-- CreateIndex
CREATE UNIQUE INDEX "unique_name" ON "portal_spec"("name");

-- CreateIndex
CREATE INDEX "portal_spec_idx" ON "portal_spec"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tag_name_key" ON "tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_data_username_key" ON "user_data"("email");

-- CreateIndex
CREATE UNIQUE INDEX "portal_spec_primary_comp_key_key" ON "portal_spec_primary"("comp_key");

-- CreateIndex
CREATE INDEX "comp_key_idx" ON "portal_spec_primary"("comp_key");

-- CreateIndex
CREATE UNIQUE INDEX "unique_column_name" ON "portal_spec_primary"("portal_spec_id", "portal_id");

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_question_set_id_fkey" FOREIGN KEY ("question_set_id") REFERENCES "question_set"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_user_data_id_fkey" FOREIGN KEY ("user_data_id") REFERENCES "user_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "character" ADD CONSTRAINT "character_classe_id_fkey" FOREIGN KEY ("classe_id") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "character" ADD CONSTRAINT "character_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "history_answered_question" ADD CONSTRAINT "history_answered_question_chosen_answer_id_fkey" FOREIGN KEY ("chosen_answer_id") REFERENCES "answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "history_answered_question" ADD CONSTRAINT "history_answered_question_portal_spec_id_fkey" FOREIGN KEY ("portal_spec_id") REFERENCES "portal_spec"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "history_answered_question" ADD CONSTRAINT "history_answered_question_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "history_answered_question" ADD CONSTRAINT "history_answered_question_user_data_id_fkey" FOREIGN KEY ("user_data_id") REFERENCES "user_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "history_answered_set_question" ADD CONSTRAINT "history_answered_set_question_question_set_id_fkey" FOREIGN KEY ("question_set_id") REFERENCES "question_set"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "history_answered_set_question" ADD CONSTRAINT "history_answered_set_question_user_data_id_fkey" FOREIGN KEY ("user_data_id") REFERENCES "user_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "portal_spec" ADD CONSTRAINT "portal_spec_portal_id_fkey" FOREIGN KEY ("portal_id") REFERENCES "portal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "question_set_tag" ADD CONSTRAINT "question_set_tag_question_set_id_fkey" FOREIGN KEY ("question_set_id") REFERENCES "question_set"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "question_set_tag" ADD CONSTRAINT "question_set_tag_tag_id_fkey1" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_data" ADD CONSTRAINT "user_data_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_data" ADD CONSTRAINT "user_data_tokens_id_fkey" FOREIGN KEY ("tokens_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_right_answer" ADD CONSTRAINT "user_right_answer_portal_spec_id_fkey" FOREIGN KEY ("portal_spec_id") REFERENCES "portal_spec"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_right_answer" ADD CONSTRAINT "user_right_answer_user_data_id_fkey" FOREIGN KEY ("user_data_id") REFERENCES "user_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "portal_spec_primary" ADD CONSTRAINT "portal_spec_primary_portal_id_fkey" FOREIGN KEY ("portal_id") REFERENCES "portal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "portal_spec_primary" ADD CONSTRAINT "portal_spec_primary_portal_spec_id_fkey" FOREIGN KEY ("portal_spec_id") REFERENCES "portal_spec"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
