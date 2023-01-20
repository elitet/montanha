import { Router } from 'express';
import ProdutosController from '../controllers/ProdutoController';
import { celebrate, Joi, Segments } from 'celebrate';

const produtosRouter = Router();
const produtosController = new ProdutosController();

produtosRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      sort: Joi.string().allow(null, '').default('nome|asc'),
      from: Joi.string().allow(null, ''),
      page: Joi.string().allow(null, ''),
      to: Joi.string().allow(null, ''),
      per_page: Joi.string().allow(null, ''),
      total: Joi.string().allow(null, ''),
      current_page: Joi.string().allow(null, ''),
      prev_page: Joi.string().allow(null, ''),
      next_page: Joi.string().allow(null, ''),
    },
  }),
  produtosController.index,
);

produtosRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  produtosController.show,
);

produtosRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      id_empresa: Joi.string().uuid().required(),
      nome: Joi.string().required(),
      qtde: Joi.number().required(),
      unid_medida: Joi.string().required(),
      status: Joi.number().default(1),
    },
  }),
  produtosController.create,
);

produtosRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      id_empresa: Joi.string().uuid().required(),
      nome: Joi.string().required(),
      qtde: Joi.number().required(),
      unid_medida: Joi.string().required(),
      status: Joi.number().default(1),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  produtosController.update,
);

produtosRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  produtosController.delete,
);

export default produtosRouter;
