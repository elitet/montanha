import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateFkEmpresa1673555852606 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criando FK da tabela Empresa -> Usuario
    await queryRunner.createForeignKey(
      'usuario',
      new TableForeignKey({
        name: 'fk_usuario_empresa',
        columnNames: ['id_empresa'],
        referencedColumnNames: ['id'],
        referencedTableName: 'empresa',
        onDelete: 'NO ACTION',
      }),
    );

    // Criando campo de ID_EMPRESA em Produto
    await queryRunner.addColumn(
      'produto',
      new TableColumn({
        name: 'id_empresa',
        type: 'uuid',
      }),
    );

    // Criando FK da tabela Empresa -> Produto
    await queryRunner.createForeignKey(
      'produto',
      new TableForeignKey({
        name: 'fk_produto_empresa',
        columnNames: ['id_empresa'],
        referencedColumnNames: ['id'],
        referencedTableName: 'empresa',
        onDelete: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('usuario', 'fk_usuario_empresa');
    await queryRunner.dropForeignKey('produto', 'fk_produto_empresa');
    await queryRunner.dropColumn('produto', 'fk_produto_empresa');
  }
}
