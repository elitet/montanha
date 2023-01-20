import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Produto from '../typeorm/entities/Produto';
import { ProdutoRepository } from '../typeorm/repositories/ProdutoRepository';

interface IRequest {
  id: string;
  id_empresa: string;
  nome: string;
  qtde: number;
  unid_medida: string;
  status: number;
}

class UpdateProdutoService {
  public async execute({
    id,
    id_empresa,
    nome,
    qtde,
    unid_medida,
    status,
  }: IRequest): Promise<Produto> {
    const produtoRepository = getCustomRepository(ProdutoRepository);

    const produto = await produtoRepository.findOne(id);

    if (!produto) {
      throw new AppError('Product not found.');
    }

    const produtoExists = await produtoRepository.findByName(nome);

    if (produtoExists && nome != produto.nome) {
      throw new AppError('There is already one product with this name.');
    }

    produto.id_empresa = id_empresa;
    produto.nome = nome;
    produto.qtde = qtde;
    produto.unid_medida = unid_medida;
    produto.status = status;

    await produtoRepository.save(produto);

    return produto;
  }
}

export default UpdateProdutoService;
