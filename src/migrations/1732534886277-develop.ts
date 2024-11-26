import { MigrationInterface, QueryRunner } from "typeorm";

export class Develop1732534886277 implements MigrationInterface {
    name = 'Develop1732534886277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "cost" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "image" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "image" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "cost" SET NOT NULL`);
    }

}
