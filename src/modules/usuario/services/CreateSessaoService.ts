import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import Usuario from '../typeorm/entities/Usuario';
import UsuarioRepository from '../typeorm/repositories/UsuarioRepository';
import authConfig from '@config/auth';
import { EmpresaRepository } from '@modules/empresa/typeorm/repositories/EmpresaRepository';

interface IRequest {
  email: string;
  senha: string;
}

interface IResponse {
  usuario: Usuario;
  logo: string;
  token: string;
}

class CreateSessaoService {
  public async execute({ email, senha }: IRequest): Promise<IResponse> {
    const usuarioRepository = getCustomRepository(UsuarioRepository);

    const empresaRepository = getCustomRepository(EmpresaRepository);

    const usuario = await usuarioRepository.findByEmail(email);

    if (!usuario) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const senhaConfirmed = await compare(senha, usuario.senha);

    if (!senhaConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: usuario.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    const empresa = await empresaRepository.findById(usuario.id_empresa);

    let logo = '';

    if (empresa) {
      logo = empresa.logo;
    }

    return { usuario, logo, token };
  }
}

export default CreateSessaoService;
