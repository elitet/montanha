import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Usuario from '../typeorm/entities/Usuario';
import UsuarioRepository from '../typeorm/repositories/UsuarioRepository';

interface IRequest {
  id: string;
  id_empresa: string;
  nome: string;
  email: string;
  grupo_acesso: number[];
  status: number;
}

class UpdateUsuarioService {
  public async execute({
    id,
    id_empresa,
    nome,
    email,
    grupo_acesso,
    status,
  }: IRequest): Promise<Usuario> {
    const usuarioRepository = getCustomRepository(UsuarioRepository);

    const user = await usuarioRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const emailExists = await usuarioRepository.findByEmail(email);

    if (emailExists && email != user.email) {
      throw new AppError('Email address already used.');
    }

    user.id = id;
    user.id_empresa = id_empresa;
    user.nome = nome;
    user.email = email;
    user.grupo_acesso = grupo_acesso;
    user.status = status;

    await usuarioRepository.save(user);

    return user;
  }
}

export default UpdateUsuarioService;
