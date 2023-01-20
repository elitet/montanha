import { EntityRepository, Repository } from 'typeorm';
import Produto from '../entities/Produto';

@EntityRepository(Produto)
export class ProdutoRepository extends Repository<Produto> {
  public async findByName(nome: string): Promise<Produto | undefined> {
    const produto = this.findOne({
      where: {
        nome,
      },
    });

    return produto;
  }
}
