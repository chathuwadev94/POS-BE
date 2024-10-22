import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactAndTestApi1729531138715 implements MigrationInterface {
    name = 'RefactAndTestApi1729531138715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ADD "barcodeId" integer`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "UQ_9de7760e6f7557bf0f8daccef67" UNIQUE ("barcodeId")`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_9de7760e6f7557bf0f8daccef67" FOREIGN KEY ("barcodeId") REFERENCES "barcode"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_9de7760e6f7557bf0f8daccef67"`);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "UQ_9de7760e6f7557bf0f8daccef67"`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "barcodeId"`);
    }

}
