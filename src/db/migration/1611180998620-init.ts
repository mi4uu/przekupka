import {MigrationInterface, QueryRunner} from 'typeorm'

export class init1611180998620 implements MigrationInterface {
  name = 'init1611180998620'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pair" ("name" character varying NOT NULL, "changeToTrend" integer NOT NULL, "changeToChangeTrend" integer NOT NULL, "volume" numeric(8,8) NOT NULL DEFAULT '0', "active" boolean NOT NULL, "coin0" character varying NOT NULL, "coin0Precision" integer NOT NULL, "coin1Precision" integer NOT NULL, "profit" character varying NOT NULL, "buyPerHour" integer NOT NULL, "coin0FriendlyName" character varying NOT NULL, "coin1FriendlyName" character varying NOT NULL, "step" numeric(8,8) NOT NULL DEFAULT '0', CONSTRAINT "PK_de8fc370bdf3ab91a4d17a4ec45" PRIMARY KEY ("name"))`,
    )
    await queryRunner.query(`CREATE TYPE "closed_transaction_type_enum" AS ENUM('buy', 'sell')`)
    await queryRunner.query(
      `CREATE TABLE "closed_transaction" ("id" SERIAL NOT NULL, "refid" character varying NOT NULL, "userref" integer NOT NULL, "status" character varying NOT NULL, "opentm" integer NOT NULL, "vol" numeric(8,8) NOT NULL DEFAULT '0', "fee" numeric(8,8) NOT NULL DEFAULT '0', "price" numeric(8,8) NOT NULL DEFAULT '0', "type" "closed_transaction_type_enum" NOT NULL, "pairName" character varying, CONSTRAINT "PK_adeefaede5f1a4e0a0b2fb341c2" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(`CREATE INDEX "IDX_8659dd5d8c44c62a9269b8de9c" ON "closed_transaction" ("pairName") `)
    await queryRunner.query(`CREATE INDEX "IDX_a52d9e7a6d6aae07144450b512" ON "closed_transaction" ("refid") `)
    await queryRunner.query(`CREATE INDEX "IDX_f88dea41533b818d88972d7201" ON "closed_transaction" ("userref") `)
    await queryRunner.query(
      `ALTER TABLE "closed_transaction" ADD CONSTRAINT "FK_8659dd5d8c44c62a9269b8de9ce" FOREIGN KEY ("pairName") REFERENCES "pair"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "closed_transaction" DROP CONSTRAINT "FK_8659dd5d8c44c62a9269b8de9ce"`)
    await queryRunner.query(`DROP INDEX "IDX_f88dea41533b818d88972d7201"`)
    await queryRunner.query(`DROP INDEX "IDX_a52d9e7a6d6aae07144450b512"`)
    await queryRunner.query(`DROP INDEX "IDX_8659dd5d8c44c62a9269b8de9c"`)
    await queryRunner.query(`DROP TABLE "closed_transaction"`)
    await queryRunner.query(`DROP TYPE "closed_transaction_type_enum"`)
    await queryRunner.query(`DROP TABLE "pair"`)
  }
}
