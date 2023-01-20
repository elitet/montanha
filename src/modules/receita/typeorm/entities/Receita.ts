import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ReceitaCatItem from './ReceitaCatItem';

@Entity('receita')
class Receita {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_empresa: string;

  @OneToMany(() => ReceitaCatItem, cat => cat.receita)
  categorias: ReceitaCatItem[];

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column('int')
  qtde_rendimento: number;

  @Column()
  unid_rendimento: string;

  @Column('decimal')
  valor_producao: number;

  @Column('int')
  porc_perda: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('int')
  status: number;
}

export default Receita;
