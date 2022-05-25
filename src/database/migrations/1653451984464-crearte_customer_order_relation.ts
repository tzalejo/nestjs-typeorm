import {MigrationInterface, QueryRunner} from "typeorm";

export class crearteCustomerOrderRelation1653451984464 implements MigrationInterface {
    name = 'crearteCustomerOrderRelation1653451984464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`customerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_124456e637cca7a415897dce659\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_124456e637cca7a415897dce659\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`customerId\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`date\` date NOT NULL`);
    }

}
