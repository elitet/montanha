import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Empresa from '../typeorm/entities/Empresa';
import { EmpresaRepository } from '../typeorm/repositories/EmpresaRepository';

interface IRequest {
  nome: string;
  endereco: string;
  bairro: string;
  numero: string;
  cep: string;
  cidade: string;
  estado: string;
  cnpj: string;
  telefone: string;
  email: string;
  site: string;
  facebook: string;
  instagram: string;
  status: number;
}

class CreateEmpresaService {
  public async execute({
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
  }: IRequest): Promise<Empresa> {
    const empresaRepository = getCustomRepository(EmpresaRepository);
    const empresaExists = await empresaRepository.findByCnpj(cnpj);

    if (empresaExists) {
      throw new AppError('There is already one company with this CPNJ.');
    }

    const empresa = empresaRepository.create({
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

    await empresaRepository.save(empresa);

    return empresa;
  }
}

export default CreateEmpresaService;
