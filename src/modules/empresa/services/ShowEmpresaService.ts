import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Empresa from '../typeorm/entities/Empresa';
import { EmpresaRepository } from '../typeorm/repositories/EmpresaRepository';

interface IRequest {
  id: string;
}

class ShowEmpresaService {
  public async execute({ id }: IRequest): Promise<Empresa> {
    const empresaRepository = getCustomRepository(EmpresaRepository);

    const empresa = await empresaRepository.findOne(id);

    if (!empresa) {
      throw new AppError('Company not found');
    }

    return empresa;
  }
}

export default ShowEmpresaService;
