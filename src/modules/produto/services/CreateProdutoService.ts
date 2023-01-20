import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Produto from '../typeorm/entities/Produto';
import { ProdutoRepository } from '../typeorm/repositories/ProdutoRepository';

interface IRequest {
  id_empresa: string;
  nome: string;
  qtde: number;
  unid_medida: string;
  status: number;
}

class CreateProdutoService {
  public async execute({
    id_empresa,
    nome,
    qtde,
    unid_medida,
    status,
  }: IRequest): Promise<Produto> {
    const produtoRepository = getCustomRepository(ProdutoRepository);
    const produtoExists = await produtoRepository.findByName(nome);

    if (produtoExists) {
      throw new AppError('There is already one product with this name.');
    }

    const produto = produtoRepository.create({
      id_empresa,
      nome,
      qtde,
      unid_medida,
      status,
    });

    await produtoRepository.save(produto);

    return produto;
  }
}

export default CreateProdutoService;
