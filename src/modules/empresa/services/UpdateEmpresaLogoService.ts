import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import Empresa from '../typeorm/entities/Empresa';
import { EmpresaRepository } from '../typeorm/repositories/EmpresaRepository';
import uploadConfig from '@config/upload';

interface IRequest {
  empresa_id: string;
  logoFilename: string;
}

class UpdateEmpresaLogoService {
  public async execute({
    empresa_id,
    logoFilename,
  }: IRequest): Promise<Empresa> {
    const empresaRepository = getCustomRepository(EmpresaRepository);
    const empresa = await empresaRepository.findOne(empresa_id);

    if (!empresa) {
      throw new AppError('Company not found.');
    }

    if (empresa.logo) {
      const empresaLogoFilePath = path.join(
        uploadConfig.directory,
        empresa.logo,
      );
      const empresaLogoFileExists = await fs.promises.stat(empresaLogoFilePath);

      if (empresaLogoFileExists) {
        await fs.promises.unlink(empresaLogoFilePath);
      }
    }

    empresa.logo = logoFilename;

    await empresaRepository.save(empresa);

    return empresa;
  }
}

export default UpdateEmpresaLogoService;
