import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Produto from '../typeorm/entities/Produto';
import { ProdutoRepository } from '../typeorm/repositories/ProdutoRepository';

interface IRequest {
  id: string;
}

class ShowProdutoService {
  public async execute({ id }: IRequest): Promise<Produto> {
    const produtoRepository = getCustomRepository(ProdutoRepository);

    const produto = await produtoRepository.findOne(id);

    if (!produto) {
      throw new AppError('Product not found.');
    }

    return produto;
  }
}

export default ShowProdutoService;
