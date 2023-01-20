import { Request, Response } from 'express';
import CreateProdutoService from '../services/CreateProdutoService';
import DeleteProdutoService from '../services/DeleteProdutoService';
import ListProdutoService from '../services/ListProdutoService';
import ShowProdutoService from '../services/ShowProdutoService';
import UpdateProdutoService from '../services/UpdateProdutoService';

export default class ProdutosController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProdutos = new ListProdutoService();

    let [field, order] = (request.query.sort as string).split('|');

    if (field == undefined || order == undefined) {
      field = 'nome';
      order = 'asc';
    }

    const produtos = await listProdutos.execute(
      field,
      order.toUpperCase() as 'ASC' | 'DESC' | undefined,
    );

    return response.json(produtos);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProduto = new ShowProdutoService();

    const produto = await showProduto.execute({ id });

    return response.json(produto);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id_empresa, nome, qtde, unid_medida, status } = request.body;

    const createProduto = new CreateProdutoService();

    const produto = await createProduto.execute({
      id_empresa,
      nome,
      qtde,
      unid_medida,
      status,
    });

    return response.json(produto);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id_empresa, nome, qtde, unid_medida, status } = request.body;
    const { id } = request.params;

    const updateProduto = new UpdateProdutoService();

    const produto = await updateProduto.execute({
      id,
      id_empresa,
      nome,
      qtde,
      unid_medida,
      status,
    });

    return response.json(produto);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduto = new DeleteProdutoService();

    await deleteProduto.execute({ id });

    return response.json([]);
  }
}
