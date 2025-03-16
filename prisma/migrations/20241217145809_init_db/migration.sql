-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F', 'O');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'DISABLED', 'BLOCKED', 'WAITING');

-- CreateEnum
CREATE TYPE "RoleReferences" AS ENUM ('ADMIN', 'ADMIN_ORGANIZATION', 'ADMIN_COMPANY', 'CLIENT');

-- CreateEnum
CREATE TYPE "AbilityCodes" AS ENUM ('ADMIN', 'ORGANIZATIONS', 'COMPANIES', 'USERS', 'ROLES');

-- CreateEnum
CREATE TYPE "AbilityActions" AS ENUM ('READ', 'CREATE', 'UPDATE', 'DELETE');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(200) NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'M',
    "phone" VARCHAR(20) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "role_id" INTEGER NOT NULL,
    "organization_id" INTEGER,
    "company_id" INTEGER,
    "avatar_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "reference" "RoleReferences" NOT NULL DEFAULT 'CLIENT',
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "organization_id" INTEGER,
    "company_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "abilities" (
    "id" SERIAL NOT NULL,
    "code" "AbilityCodes" NOT NULL DEFAULT 'USERS',
    "action" "AbilityActions" NOT NULL DEFAULT 'CREATE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "abilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_abilities" (
    "role_id" INTEGER NOT NULL,
    "ability_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "role_abilities_pkey" PRIMARY KEY ("role_id","ability_id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "trade_name" VARCHAR(100),
    "email" VARCHAR(100) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "address_id" INTEGER NOT NULL,
    "avatar_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "trade_name" VARCHAR(100),
    "email" VARCHAR(100) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "organization_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,
    "avatar_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "state" CHAR(2) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "street" VARCHAR(100) NOT NULL,
    "neighborhood" VARCHAR(100) NOT NULL,
    "complement" VARCHAR(150),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stored_files" (
    "id" SERIAL NOT NULL,
    "uuid" VARCHAR(100) NOT NULL,
    "alt" TEXT NOT NULL,
    "original_name" VARCHAR(100) NOT NULL,
    "stored_name" VARCHAR(150) NOT NULL,
    "relative_path" TEXT NOT NULL,
    "content_type" TEXT NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "checksum" CHAR(32) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stored_files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_avatar_id_key" ON "users"("avatar_id");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_name_key" ON "organizations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_avatar_id_key" ON "organizations"("avatar_id");

-- CreateIndex
CREATE UNIQUE INDEX "companies_name_key" ON "companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "companies_email_key" ON "companies"("email");

-- CreateIndex
CREATE UNIQUE INDEX "companies_avatar_id_key" ON "companies"("avatar_id");

-- CreateIndex
CREATE UNIQUE INDEX "stored_files_uuid_key" ON "stored_files"("uuid");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_fkey" FOREIGN KEY ("avatar_id") REFERENCES "stored_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_abilities" ADD CONSTRAINT "role_abilities_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_abilities" ADD CONSTRAINT "role_abilities_ability_id_fkey" FOREIGN KEY ("ability_id") REFERENCES "abilities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_avatar_id_fkey" FOREIGN KEY ("avatar_id") REFERENCES "stored_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_avatar_id_fkey" FOREIGN KEY ("avatar_id") REFERENCES "stored_files"("id") ON DELETE SET NULL ON UPDATE CASCADE;
