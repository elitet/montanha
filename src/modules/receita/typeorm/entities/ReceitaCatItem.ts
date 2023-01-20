import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Receita from './Receita';
import ReceitaItem from './ReceitaItem';

@Entity('receita_categoria_item')
class ReceitaCatItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Receita, receita => receita.categorias)
  @JoinColumn({ name: 'id_receita' })
  receita: Receita;

  @OneToMany(() => ReceitaItem, item => item.receita_categoria)
  receita_items: ReceitaItem[];

  @Column()
  id_receita: string;

  @Column()
  nome: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('int')
  status: number;
}

export default ReceitaCatItem;
