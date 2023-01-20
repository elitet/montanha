import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProdutoRepository } from '../typeorm/repositories/ProdutoRepository';

interface IRequest {
  id: string;
}

class DeleteProdutoService {
  public async execute({ id }: IRequest): Promise<void> {
    const produtoRepository = getCustomRepository(ProdutoRepository);

    const produto = await produtoRepository.findOne(id);

    if (!produto) {
      throw new AppError('Product not found.');
    }

    await produtoRepository.remove(produto);
  }
}

export default DeleteProdutoService;
