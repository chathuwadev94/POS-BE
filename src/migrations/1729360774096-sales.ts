import { MigrationInterface, QueryRunner } from "typeorm";

export class Sales1729360774096 implements MigrationInterface {
    name = 'Sales1729360774096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sale-item" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "unitPrice" integer NOT NULL, "totalPrice" integer NOT NULL, "saleId" integer, "itemId" integer, CONSTRAINT "PK_7270dc57e14ec412b88b140ddd8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sale" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "totalAmount" integer NOT NULL, "itemCount" integer NOT NULL, "userId" integer, CONSTRAINT "PK_d03891c457cbcd22974732b5de2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sale-item" ADD CONSTRAINT "FK_7f38f9e71d8014a208c816972aa" FOREIGN KEY ("saleId") REFERENCES "sale"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale-item" ADD CONSTRAINT "FK_0e9560a18979130f96bf79625f6" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale" ADD CONSTRAINT "FK_bf176f13c0bce3c693b24523794" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale" DROP CONSTRAINT "FK_bf176f13c0bce3c693b24523794"`);
        await queryRunner.query(`ALTER TABLE "sale-item" DROP CONSTRAINT "FK_0e9560a18979130f96bf79625f6"`);
        await queryRunner.query(`ALTER TABLE "sale-item" DROP CONSTRAINT "FK_7f38f9e71d8014a208c816972aa"`);
        await queryRunner.query(`DROP TABLE "sale"`);
        await queryRunner.query(`DROP TABLE "sale-item"`);
    }

}
