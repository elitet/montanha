import Produto from '@modules/produto/typeorm/entities/Produto';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ReceitaCatItem from './ReceitaCatItem';

@Entity('receita_item')
class ReceitaItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ReceitaCatItem, cat => cat.receita_items)
  @JoinColumn({ name: 'id_receita_cat_item' })
  receita_categoria: ReceitaCatItem;

  @Column()
  id_receita_cat_item: string;

  @ManyToOne(() => Produto, produto => produto.receita_items)
  @JoinColumn({ name: 'id_produto' })
  produto: Produto;

  @Column()
  id_produto: string;

  @Column('int')
  quantidade: number;

  @Column('int')
  unid_qtde: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('int')
  status: number;
}

export default ReceitaItem;
