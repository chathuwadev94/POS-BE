import { MigrationInterface, QueryRunner } from "typeorm";

export class Develop1732462196593 implements MigrationInterface {
    name = 'Develop1732462196593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "showroom" ADD "phoneNumber" character varying(200)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "showroom" DROP COLUMN "phoneNumber"`);
    }

}
