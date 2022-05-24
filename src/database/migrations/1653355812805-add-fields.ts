import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFields1653355812805 implements MigrationInterface {
  name = 'addFields1653355812805';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`updateAt\``);
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`createAt\``);
  }
}
