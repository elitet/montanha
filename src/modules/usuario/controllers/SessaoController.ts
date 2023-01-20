import { Request, Response } from 'express';
import CreateSessaoService from '../services/CreateSessaoService';

export default class SessaoController {
  public async create(
    resquest: Request,
    response: Response,
  ): Promise<Response> {
    const { email, senha } = resquest.body;

    const createSessao = new CreateSessaoService();

    const sessao = await createSessao.execute({ email, senha });

    return response.json(sessao);
  }
}
