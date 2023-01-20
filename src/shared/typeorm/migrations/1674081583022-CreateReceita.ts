import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateReceita1674081583022 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'receita',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'id_empresa',
            type: 'uuid',
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'descricao',
            type: 'varchar',
          },
          {
            name: 'qtde_rendimento',
            type: 'int',
          },
          {
            name: 'unid_rendimento',
            type: 'varchar',
          },
          {
            name: 'valor_producao',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'porc_perda',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'status',
            type: 'int',
            default: '1',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'receita_item',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'id_receita_cat_item',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'id_produto',
            type: 'uuid',
          },
          {
            name: 'quantidade',
            type: 'int',
          },
          {
            name: 'unid_qtde',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'status',
            type: 'int',
            default: '1',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'receita_categoria_item',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'id_receita',
            type: 'uuid',
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'status',
            type: 'int',
            default: '1',
          },
        ],
      }),
    );

    // Criando FK da tabela Empresa -> Receita
    await queryRunner.createForeignKey(
      'receita',
      new TableForeignKey({
        name: 'fk_receita_empresa',
        columnNames: ['id_empresa'],
        referencedColumnNames: ['id'],
        referencedTableName: 'empresa',
        onDelete: 'NO ACTION',
      }),
    );

    // Criando FK da tabela Produto -> Receita-Item
    await queryRunner.createForeignKey(
      'receita_item',
      new TableForeignKey({
        name: 'fk_receita_item_produto',
        columnNames: ['id_produto'],
        referencedColumnNames: ['id'],
        referencedTableName: 'produto',
        onDelete: 'NO ACTION',
      }),
    );

    // Criando FK da tabela receita -> receita_item
    await queryRunner.createForeignKey(
      'receita_categoria_item',
      new TableForeignKey({
        name: 'fk_receita_receita_item',
        columnNames: ['id_receita'],
        referencedColumnNames: ['id'],
        referencedTableName: 'receita',
        onDelete: 'NO ACTION',
      }),
    );

    // Criando FK da tabela receita_categoria_item -> receita_item
    await queryRunner.createForeignKey(
      'receita_item',
      new TableForeignKey({
        name: 'fk_receita_receita_cat_item',
        columnNames: ['id_receita_cat_item'],
        referencedColumnNames: ['id'],
        referencedTableName: 'receita_categoria_item',
        onDelete: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('receita');
    await queryRunner.dropTable('receita_item');
    await queryRunner.dropTable('receita_categoria_item');

    await queryRunner.dropForeignKey('receita', 'fk_receita_empresa');
    await queryRunner.dropForeignKey('receita_item', 'fk_receita_item_produto');
    await queryRunner.dropForeignKey('receita_item', 'fk_receita_receita_item');
    await queryRunner.dropForeignKey(
      'receita_item',
      'fk_receita_receita_cat_item',
    );
  }
}
