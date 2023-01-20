import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsuarioController from '../controllers/UsuarioController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const usuarioRouter = Router();
const usuarioController = new UsuarioController();

// isAuthenticated

usuarioRouter.get(
  '/',
  isAuthenticated,
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
  usuarioController.index,
);

usuarioRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      id_empresa: Joi.string().uuid().required(),
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      senha: Joi.string().default('12345'),
      grupo_acesso: Joi.array().required(),
      status: Joi.number().required(),
    },
  }),
  usuarioController.create,
);

usuarioRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      id_empresa: Joi.string().uuid().required(),
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      grupo_acesso: Joi.array().required(),
      status: Joi.number().required(),
    },
  }),
  usuarioController.update,
);

export default usuarioRouter;
