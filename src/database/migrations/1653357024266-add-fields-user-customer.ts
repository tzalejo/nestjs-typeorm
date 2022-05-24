import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFieldsUserCustomer1653357024266 implements MigrationInterface {
  name = 'addFieldsUserCustomer1653357024266';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ADD \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ADD \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`customer\` DROP COLUMN \`updateAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` DROP COLUMN \`createAt\``,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updateAt\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createAt\``);
  }
}
