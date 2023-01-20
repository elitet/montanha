import { Request, Response } from 'express';
import CreateEmpresaService from '../services/CreateEmpresaService';
import ShowEmpresaService from '../services/ShowEmpresaService';
import UpdateEmpresaService from '../services/UpdateEmpresaService';

export default class EmpresaController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showEmpresa = new ShowEmpresaService();

    const empresa = await showEmpresa.execute({ id });

    return response.json(empresa);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      endereco,
      bairro,
      numero,
      cep,
      cidade,
      estado,
      cnpj,
      telefone,
      email,
      site,
      facebook,
      instagram,
      status,
    } = request.body;

    const createEmpresa = new CreateEmpresaService();

    const empresa = await createEmpresa.execute({
      nome,
      endereco,
      bairro,
      numero,
      cep,
      cidade,
      estado,
      cnpj,
      telefone,
      email,
      site,
      facebook,
      instagram,
      status,
    });

    return response.json(empresa);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      endereco,
      bairro,
      numero,
      cep,
      cidade,
      estado,
      cnpj,
      telefone,
      email,
      site,
      facebook,
      instagram,
      status,
    } = request.body;
    const { id } = request.params;

    const updateEmpresa = new UpdateEmpresaService();

    const empresa = await updateEmpresa.execute({
      id,
      nome,
      endereco,
      bairro,
      numero,
      cep,
      cidade,
      estado,
      cnpj,
      telefone,
      email,
      site,
      facebook,
      instagram,
      status,
    });

    return response.json(empresa);
  }
}
