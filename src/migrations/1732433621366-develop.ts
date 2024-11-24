import { MigrationInterface, QueryRunner } from "typeorm";

export class Develop1732433621366 implements MigrationInterface {
    name = 'Develop1732433621366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phoneNumber" character varying(200)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`);
    }

}
