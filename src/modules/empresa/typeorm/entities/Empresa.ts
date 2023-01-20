import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('empresa')
class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  endereco: string;

  @Column()
  bairro: string;

  @Column()
  numero: string;

  @Column()
  cep: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  cnpj: string;

  @Column()
  telefone: string;

  @Column()
  email: string;

  @Column()
  site: string;

  @Column()
  facebook: string;

  @Column()
  instagram: string;

  @Column()
  logo: string;

  @Column()
  cor_principal: string;

  @Column()
  cor_secundaria: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('int')
  status: number;
}

export default Empresa;
