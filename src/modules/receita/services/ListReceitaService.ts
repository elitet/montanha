import { getCustomRepository } from 'typeorm';
import Receita from '../typeorm/entities/Receita';
import { ReceitaRepository } from '../typeorm/repositories/ReceitaRepository';

interface IPaginateReceita {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Receita[];
}

class ListReceitaService {
  public async execute(
    field: string,
    order?: 'ASC' | 'DESC' | undefined,
  ): Promise<IPaginateReceita> {
    const receitaRepository = getCustomRepository(ReceitaRepository);

    const receitas = await receitaRepository
      .createQueryBuilder()
      .orderBy(field, order)
      .paginate();

    return receitas as IPaginateReceita;
  }
}

export default ListReceitaService;
