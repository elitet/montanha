import { Request, Response } from 'express';
import UpdateEmpresaLogoService from '../services/UpdateEmpresaLogoService';

export default class EmpresaLogoController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateEmpresa = new UpdateEmpresaLogoService();

    const empresa = await updateEmpresa.execute({
      empresa_id: request.params.id,
      logoFilename: request.file?.filename as string,
    });

    return response.json(empresa);
  }
}
