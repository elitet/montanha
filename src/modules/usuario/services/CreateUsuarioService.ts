import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Usuario from '../typeorm/entities/Usuario';
import UsuarioRepository from '../typeorm/repositories/UsuarioRepository';

interface IRequest {
  id_empresa: string;
  nome: string;
  email: string;
  senha: string;
  grupo_acesso: number[];
  status: number;
}

class CreateUsuarioService {
  public async execute({
    id_empresa,
    nome,
    email,
    senha,
    grupo_acesso,
    status,
  }: IRequest): Promise<Usuario> {
    const usuarioRepository = getCustomRepository(UsuarioRepository);

    const emailExists = await usuarioRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const hashedSenha = await hash(senha, 8);

    const usuario = usuarioRepository.create({
      id_empresa,
      nome,
      email,
      senha: hashedSenha,
      grupo_acesso,
      status,
    });

    await usuarioRepository.save(usuario);

    return usuario;
  }
}

export default CreateUsuarioService;
