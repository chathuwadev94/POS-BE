import { MigrationInterface, QueryRunner } from "typeorm";

export class Develop1729072801702 implements MigrationInterface {
    name = 'Develop1729072801702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_gender_enum" AS ENUM('m', 'f', 'o')`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isActivate" boolean NOT NULL DEFAULT true, "id" SERIAL NOT NULL, "firstName" character varying(100) NOT NULL, "lastName" character varying(100), "nic" character varying(100) NOT NULL, "gender" "public"."user_gender_enum", "email" character varying(100) NOT NULL, "address" character varying(100), "userName" character varying(100) NOT NULL, "password" character varying(200) NOT NULL, "roles" character varying array NOT NULL, "status" "public"."user_status_enum" NOT NULL DEFAULT '0', CONSTRAINT "UQ_83227bb396702f98d8ed8c580f0" UNIQUE ("nic", "userName"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
    }

}
