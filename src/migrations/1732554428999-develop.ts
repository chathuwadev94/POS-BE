import { MigrationInterface, QueryRunner } from "typeorm";

export class Develop1732554428999 implements MigrationInterface {
    name = 'Develop1732554428999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "barcode" ADD "typeName" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "barcode" DROP COLUMN "typeName"`);
    }

}
