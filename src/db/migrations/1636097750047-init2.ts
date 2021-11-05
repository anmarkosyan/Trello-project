import {MigrationInterface, QueryRunner} from "typeorm";

export class init21636097750047 implements MigrationInterface {
    name = 'init21636097750047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."card" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."card" ALTER COLUMN "description" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."card" ALTER COLUMN "description" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "public"."card" ALTER COLUMN "description" DROP NOT NULL`);
    }

}
