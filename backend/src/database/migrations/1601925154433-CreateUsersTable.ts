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
                    name: 'email',
                    type: 'varchar',
                    isUnique: true
                },
                {

                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'username',
                    type: 'varchar',
                    isUnique: true,
                    isPrimary: true,

                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                /*     {
                         name: 'photo',
                         type:'varchar',
                       },*/
                {
                    name: 'city',
                    type: 'varchar',
                },
                {
                    name: 'uf',
                    type: 'varchar',
                },
                {
                    name: 'age',
                    type: 'varchar',
                },

            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('users')
    }

}
