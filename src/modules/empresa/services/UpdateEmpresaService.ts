import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Empresa from '../typeorm/entities/Empresa';
import { EmpresaRepository } from '../typeorm/repositories/EmpresaRepository';

interface IRequest {
  id: string;
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

class UpdateEmpresaService {
  public async execute({
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
  }: IRequest): Promise<Empresa> {
    const empresaRepository = getCustomRepository(EmpresaRepository);
    const empresa = await empresaRepository.findOne(id);

    if (!empresa) {
      throw new AppError('Company not found.');
    }

    const empresaExists = await empresaRepository.findByCnpj(cnpj);

    if (empresaExists && cnpj != empresa.cnpj) {
      throw new AppError('There is already one company with this CNPJ.');
    }

    empresa.nome = nome;
    empresa.endereco = endereco;
    empresa.bairro = bairro;
    empresa.numero = numero;
    empresa.cep = cep;
    empresa.cidade = cidade;
    empresa.estado = estado;
    empresa.cnpj = cnpj;
    empresa.telefone = telefone;
    empresa.email = email;
    empresa.site = site;
    empresa.facebook = facebook;
    empresa.instagram = instagram;
    empresa.status = status;

    await empresaRepository.save(empresa);

    return empresa;
  }
}

export default UpdateEmpresaService;
