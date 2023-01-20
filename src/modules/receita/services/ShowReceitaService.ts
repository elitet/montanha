import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Receita from '../typeorm/entities/Receita';
import { ReceitaRepository } from '../typeorm/repositories/ReceitaRepository';

interface IRequest {
  id: string;
}

class ShowReceitaService {
  public async execute({ id }: IRequest): Promise<Receita> {
    const receitaRepository = getCustomRepository(ReceitaRepository);

    const receita = await receitaRepository.findOne({
      where: { id },
      relations: [
        'categorias',
        'categorias.receita_items',
        'categorias.receita_items.produto',
      ],
    });

    if (!receita) {
      throw new AppError('Recepi not found.');
    }

    return receita;
  }
}

export default ShowReceitaService;
