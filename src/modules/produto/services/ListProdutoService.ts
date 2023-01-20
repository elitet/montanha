import { getCustomRepository } from 'typeorm';
import Produto from '../typeorm/entities/Produto';
import { ProdutoRepository } from '../typeorm/repositories/ProdutoRepository';

interface IPaginateProduto {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Produto[];
}

class ListProdutoService {
  public async execute(
    field: string,
    order?: 'ASC' | 'DESC' | undefined,
  ): Promise<IPaginateProduto> {
    const produtoRepository = getCustomRepository(ProdutoRepository);

    const produtos = await produtoRepository
      .createQueryBuilder()
      .orderBy(field, order)
      .paginate();

    return produtos as IPaginateProduto;
  }
}

export default ListProdutoService;
