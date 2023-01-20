import ReceitaItem from '@modules/receita/typeorm/entities/ReceitaItem';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('produto')
class Produto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_empresa: string;

  @OneToMany(() => ReceitaItem, item => item.produto)
  receita_items: ReceitaItem[];

  @Column()
  nome: string;

  @Column('int')
  qtde: number;

  @Column()
  unid_medida: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('int')
  status: number;
}

export default Produto;
