import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterCreateProduct1673532233167 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'produto',
      'unid_medida',
      new TableColumn({
        name: 'unid_medida',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('produto', 'unid_medida');
  }
}
