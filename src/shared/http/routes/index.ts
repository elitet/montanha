import { Router } from 'express';
import produtosRouter from '@modules/produto/routes/produtos.routes';
import usuarioRouter from '@modules/usuario/routes/usuario.routes';
import sessaoRouter from '@modules/usuario/routes/sessao.routes';
import empresaRouter from '@modules/empresa/routes/empresa.routes';
import receitaRouter from '@modules/receita/routes/receitas.routes';

const routes = Router();

routes.use('/products', produtosRouter);
routes.use('/users', usuarioRouter);
routes.use('/sessions', sessaoRouter);
routes.use('/company', empresaRouter);
routes.use('/recepis', receitaRouter);

export default routes;
