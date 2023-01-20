import { getCustomRepository } from 'typeorm';
import Usuario from '../typeorm/entities/Usuario';
import UsuarioRepository from '../typeorm/repositories/UsuarioRepository';

interface IPaginateUsuario {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Usuario[];
}

class ListUsuarioService {
  public async execute(
    field: string,
    order?: 'ASC' | 'DESC' | undefined,
  ): Promise<IPaginateUsuario> {
    const usuarioRepository = getCustomRepository(UsuarioRepository);

    const usuario = await usuarioRepository
      .createQueryBuilder()
      .orderBy(field, order)
      .paginate();

    return usuario as IPaginateUsuario;
  }
}

export default ListUsuarioService;
