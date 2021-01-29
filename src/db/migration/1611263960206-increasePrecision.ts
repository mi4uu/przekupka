import {MigrationInterface, QueryRunner} from "typeorm";

export class increasePrecision1611263960206 implements MigrationInterface {
    name = 'increasePrecision1611263960206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pair" ALTER COLUMN "volume" TYPE numeric(16,8)`);
        await queryRunner.query(`COMMENT ON COLUMN "pair"."volume" IS NULL`);
        await queryRunner.query(`ALTER TABLE "pair" ALTER COLUMN "step" TYPE numeric(16,8)`);
        await queryRunner.query(`COMMENT ON COLUMN "pair"."step" IS NULL`);
        await queryRunner.query(`ALTER TABLE "closed_transaction" ALTER COLUMN "vol" TYPE numeric(16,8)`);
        await queryRunner.query(`COMMENT ON COLUMN "closed_transaction"."vol" IS NULL`);
        await queryRunner.query(`ALTER TABLE "closed_transaction" ALTER COLUMN "fee" TYPE numeric(16,8)`);
        await queryRunner.query(`COMMENT ON COLUMN "closed_transaction"."fee" IS NULL`);
        await queryRunner.query(`ALTER TABLE "closed_transaction" ALTER COLUMN "price" TYPE numeric(16,8)`);
        await queryRunner.query(`COMMENT ON COLUMN "closed_transaction"."price" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "closed_transaction"."price" IS NULL`);
        await queryRunner.query(`ALTER TABLE "closed_transaction" ALTER COLUMN "price" TYPE numeric(8,8)`);
        await queryRunner.query(`COMMENT ON COLUMN "closed_transaction"."fee" IS NULL`);
        await queryRunner.query(`ALTER TABLE "closed_transaction" ALTER COLUMN "fee" TYPE numeric(8,8)`);
        await queryRunner.query(`COMMENT ON COLUMN "closed_transaction"."vol" IS NULL`);
        await queryRunner.query(`ALTER TABLE "closed_transaction" ALTER COLUMN "vol" TYPE numeric(8,8)`);
        await queryRunner.query(`COMMENT ON COLUMN "pair"."step" IS NULL`);
        await queryRunner.query(`ALTER TABLE "pair" ALTER COLUMN "step" TYPE numeric(8,8)`);
        await queryRunner.query(`COMMENT ON COLUMN "pair"."volume" IS NULL`);
        await queryRunner.query(`ALTER TABLE "pair" ALTER COLUMN "volume" TYPE numeric(8,8)`);
    }

}
