import {MigrationInterface, QueryRunner} from "typeorm";

export class addFewFields1611261484975 implements MigrationInterface {
    name = 'addFewFields1611261484975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pair" ADD "coin1" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pair" ADD "coin0Name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pair" ADD "coin1Name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pair" DROP COLUMN "coin1Name"`);
        await queryRunner.query(`ALTER TABLE "pair" DROP COLUMN "coin0Name"`);
        await queryRunner.query(`ALTER TABLE "pair" DROP COLUMN "coin1"`);
    }

}
