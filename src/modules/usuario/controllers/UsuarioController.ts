import { Request, Response } from 'express';
import CreateUsuarioService from '../services/CreateUsuarioService';
import ListUsuarioService from '../services/ListUsuarioService';
import UpdateUsuarioService from '../services/UpdateUsuarioService';

export default class UsuarioController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsuario = new ListUsuarioService();

    let [field, order] = (request.query.sort as string).split('|');

    if (field == undefined || order == undefined) {
      field = 'nome';
      order = 'asc';
    }

    const usuarios = await listUsuario.execute(
      field,
      order.toUpperCase() as 'ASC' | 'DESC' | undefined,
    );

    return response.json(usuarios);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      id_empresa,
      nome,
      email,
      senha,
      grupo_acesso,
      status,
    } = request.body;

    const createUsuario = new CreateUsuarioService();

    const usuario = await createUsuario.execute({
      id_empresa,
      nome,
      email,
      senha,
      grupo_acesso,
      status,
    });

    return response.json(usuario);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, id_empresa, nome, email, grupo_acesso, status } = request.body;

    const updateUsuario = new UpdateUsuarioService();

    const produto = await updateUsuario.execute({
      id,
      id_empresa,
      nome,
      email,
      grupo_acesso,
      status,
    });

    return response.json(produto);
  }
}
