import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactAndTestApi1731260999871 implements MigrationInterface {
    name = 'RefactAndTestApi1731260999871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale" ADD "payment" integer DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale" DROP COLUMN "payment"`);
    }

}
