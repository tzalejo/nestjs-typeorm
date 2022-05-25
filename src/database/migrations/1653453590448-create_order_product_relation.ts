import {MigrationInterface, QueryRunner} from "typeorm";

export class createOrderProductRelation1653453590448 implements MigrationInterface {
    name = 'createOrderProductRelation1653453590448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`order_product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`productId\` int NULL, \`orderId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`order_product\` ADD CONSTRAINT \`FK_073c85ed133e05241040bd70f02\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_product\` ADD CONSTRAINT \`FK_3fb066240db56c9558a91139431\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_product\` DROP FOREIGN KEY \`FK_3fb066240db56c9558a91139431\``);
        await queryRunner.query(`ALTER TABLE \`order_product\` DROP FOREIGN KEY \`FK_073c85ed133e05241040bd70f02\``);
        await queryRunner.query(`DROP TABLE \`order_product\``);
    }

}
