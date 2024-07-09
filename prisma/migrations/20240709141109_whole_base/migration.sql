/*
  Warnings:

  - Added the required column `roomId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    CONSTRAINT "Project_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "projectID" TEXT NOT NULL,
    CONSTRAINT "Task_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Estimate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "card" TEXT NOT NULL,
    "taskID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    CONSTRAINT "Estimate_taskID_fkey" FOREIGN KEY ("taskID") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Estimate_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AIEstimate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "card" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "taskID" TEXT NOT NULL,
    CONSTRAINT "AIEstimate_taskID_fkey" FOREIGN KEY ("taskID") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    CONSTRAINT "User_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("id", "name", "role") SELECT "id", "name", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Estimate_userID_key" ON "Estimate"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "AIEstimate_taskID_key" ON "AIEstimate"("taskID");
