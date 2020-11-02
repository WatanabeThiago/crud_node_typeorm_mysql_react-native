import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1601925154433 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {



        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',

                },
                {
                    name: 'state',
                    type: 'integer',
                    isGenerated: true,
                    generationStrategy: 'increment',

                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {

                    name: 'icon',
                    type: 'varchar'
                },
                

            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('users')
    }

}
