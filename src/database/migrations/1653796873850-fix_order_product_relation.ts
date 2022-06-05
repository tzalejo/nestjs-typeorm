import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixOrderProductRelation1653796873850
  implements MigrationInterface
{
  name = 'fixOrderProductRelation1653796873850';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_6c687a8fa35b0ae35ce766b56c\` ON \`user\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_6c687a8fa35b0ae35ce766b56c\` ON \`user\` (\`customerId\`)`,
    );
  }
}
