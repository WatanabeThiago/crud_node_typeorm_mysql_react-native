import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSellsTable1604331304033 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'sells',
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
                    name: 'name',
                    type: 'varchar',
                    unsigned: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'price',
                    type: 'integer',
                    unsigned: true,
                    
                },
                {
                    name: 'description',
                    type: 'varchar',
                    
                }

                

            ]
        }))
    }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
