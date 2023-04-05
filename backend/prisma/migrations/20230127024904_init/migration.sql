-- CreateEnum
CREATE TYPE "difficulty" AS ENUM ('easy', 'normal', 'hard', 'very_hard', 'expert');

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_info" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "character_id" INTEGER NOT NULL,

    CONSTRAINT "user_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answer" (
    "id" SERIAL NOT NULL,
    "body" TEXT NOT NULL,
    "question_id" INTEGER NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "description" TEXT,

    CONSTRAINT "answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" SERIAL NOT NULL,
    "body" TEXT NOT NULL,
    "rating" DECIMAL DEFAULT 0,
    "difficulty" "difficulty" NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_tags" (
    "question_id" INTEGER NOT NULL,
    "tags_id" INTEGER NOT NULL,

    CONSTRAINT "question_tags_pkey" PRIMARY KEY ("question_id","tags_id")
);

-- CreateTable
CREATE TABLE "character" (
    "id" SERIAL NOT NULL,
    "strenght" INTEGER DEFAULT 0,
    "intelligence" INTEGER DEFAULT 0,
    "dexterity" INTEGER DEFAULT 0,
    "vitality" INTEGER DEFAULT 0,
    "luck" INTEGER DEFAULT 0,
    "level" DECIMAL DEFAULT 1,

    CONSTRAINT "character_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- AddForeignKey
ALTER TABLE "user_info" ADD CONSTRAINT "user_info_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "question_tags" ADD CONSTRAINT "question_tags_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "question_tags" ADD CONSTRAINT "question_tags_tags_id_fkey" FOREIGN KEY ("tags_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
