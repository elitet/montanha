import { Router } from 'express';
import ReceitasController from '../controllers/ReceitaController';
import { celebrate, Joi, Segments } from 'celebrate';

const receitasRouter = Router();
const receitasController = new ReceitasController();

receitasRouter.get(
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
  receitasController.index,
);

receitasRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  receitasController.show,
);

export default receitasRouter;
