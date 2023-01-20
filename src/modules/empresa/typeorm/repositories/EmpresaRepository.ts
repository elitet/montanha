import { EntityRepository, Repository } from 'typeorm';
import Empresa from '../entities/Empresa';

@EntityRepository(Empresa)
export class EmpresaRepository extends Repository<Empresa> {
  public async findById(id: string): Promise<Empresa | undefined> {
    const empresa = this.findOne({
      where: {
        id,
      },
    });

    return empresa;
  }

  public async findByCnpj(cnpj: string): Promise<Empresa | undefined> {
    const empresa = this.findOne({
      where: {
        cnpj,
      },
    });

    return empresa;
  }
}
