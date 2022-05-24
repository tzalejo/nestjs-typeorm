import { MigrationInterface, QueryRunner } from 'typeorm';

export class crearteBrandsAndRelations1653400876897
  implements MigrationInterface
{
  name = 'crearteBrandsAndRelations1653400876897';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`brand\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_5f468ae5696f07da025138e38f\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`product\` ADD \`brandId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_bb7d3d9dc1fae40293795ae39d6\` FOREIGN KEY (\`brandId\`) REFERENCES \`brand\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_bb7d3d9dc1fae40293795ae39d6\``,
    );
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`brandId\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_5f468ae5696f07da025138e38f\` ON \`brand\``,
    );
    await queryRunner.query(`DROP TABLE \`brand\``);
  }
}
