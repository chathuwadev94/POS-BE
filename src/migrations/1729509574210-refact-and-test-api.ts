import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactAndTestApi1729509574210 implements MigrationInterface {
    name = 'RefactAndTestApi1729509574210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "showroom" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isActivate" boolean NOT NULL DEFAULT true, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "warehouseId" integer NOT NULL, "location" character varying NOT NULL, CONSTRAINT "PK_50d3dd8987c723cd7e535517199" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "unitPrice"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "category" ADD "isActivate" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "barcode" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "barcode" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "barcode" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "barcode" ADD "isActivate" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" ADD "showroomId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sale" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "sale" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "sale" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "sale" ADD "isActivate" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "sale-item" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "sale-item" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "sale-item" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "sale-item" ADD "isActivate" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "item" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "item" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "item" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "item" ADD "isActivate" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "stock" ADD "unitPrice" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_85a2d8c148de5beb1cfa8929aa3" FOREIGN KEY ("showroomId") REFERENCES "showroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_623dbc561abc7fade5a85931712" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "showroom" ADD CONSTRAINT "FK_26815c8ccd8169eb07bee390040" FOREIGN KEY ("warehouseId") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "showroom" DROP CONSTRAINT "FK_26815c8ccd8169eb07bee390040"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_623dbc561abc7fade5a85931712"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_85a2d8c148de5beb1cfa8929aa3"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP COLUMN "unitPrice"`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "isActivate"`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "sale-item" DROP COLUMN "isActivate"`);
        await queryRunner.query(`ALTER TABLE "sale-item" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "sale-item" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "sale-item" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "sale" DROP COLUMN "isActivate"`);
        await queryRunner.query(`ALTER TABLE "sale" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "sale" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "sale" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "showroomId"`);
        await queryRunner.query(`ALTER TABLE "barcode" DROP COLUMN "isActivate"`);
        await queryRunner.query(`ALTER TABLE "barcode" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "barcode" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "barcode" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "isActivate"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "item" ADD "unitPrice" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item" ADD "price" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "showroom"`);
    }

}
