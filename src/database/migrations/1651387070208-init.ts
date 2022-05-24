import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1651387070208 implements MigrationInterface {
  name = 'init1651387070208';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`price\` int NOT NULL, \`stock\` int NOT NULL, \`image\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`order\``);
    await queryRunner.query(`DROP TABLE \`customer\``);
    await queryRunner.query(`DROP TABLE \`product\``);
  }
}
