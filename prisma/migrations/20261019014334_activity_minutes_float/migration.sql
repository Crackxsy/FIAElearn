/*
  Warnings:

  - You are about to alter the column `minutes` on the `DailyActivity` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DailyActivity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "minutes" REAL NOT NULL DEFAULT 0,
    "questions" INTEGER NOT NULL DEFAULT 0,
    "correct" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "DailyActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_DailyActivity" ("correct", "day", "id", "minutes", "questions", "userId") SELECT "correct", "day", "id", "minutes", "questions", "userId" FROM "DailyActivity";
DROP TABLE "DailyActivity";
ALTER TABLE "new_DailyActivity" RENAME TO "DailyActivity";
CREATE UNIQUE INDEX "DailyActivity_userId_day_key" ON "DailyActivity"("userId", "day");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
