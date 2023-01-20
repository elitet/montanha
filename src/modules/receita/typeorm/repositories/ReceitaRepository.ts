import { EntityRepository, Repository } from 'typeorm';
import Receita from '../entities/Receita';

@EntityRepository(Receita)
export class ReceitaRepository extends Repository<Receita> {
  public async findByName(nome: string): Promise<Receita | undefined> {
    const receita = this.findOne({
      where: {
        nome,
      },
    });

    return receita;
  }
}

export default ReceitaRepository;
