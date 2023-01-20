import { Request, Response } from 'express';
import ListReceitaService from '../services/ListReceitaService';
import ShowReceitaService from '../services/ShowReceitaService';

export default class ReceitaController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listReceita = new ListReceitaService();

    let [field, order] = (request.query.sort as string).split('|');

    if (field == undefined || order == undefined) {
      field = 'nome';
      order = 'asc';
    }

    const receitas = await listReceita.execute(
      field,
      order.toUpperCase() as 'ASC' | 'DESC' | undefined,
    );

    return response.json(receitas);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showReceita = new ShowReceitaService();

    const receita = await showReceita.execute({ id });

    return response.json(receita);
  }
}
