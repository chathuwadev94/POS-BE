import { MigrationInterface, QueryRunner } from "typeorm";

export class Items1729355226984 implements MigrationInterface {
    name = 'Items1729355226984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "barcode" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "type" integer NOT NULL, CONSTRAINT "PK_069a36ae1998109c8dece11d3c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "unitPrice" integer NOT NULL, "cost" integer NOT NULL, "image" character varying NOT NULL, "manufactur" character varying NOT NULL, "categoryId" integer, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_c0c8f47a702c974a77812169bc2" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_c0c8f47a702c974a77812169bc2"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP TABLE "barcode"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
