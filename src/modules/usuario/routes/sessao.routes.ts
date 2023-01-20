import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessaoController from '../controllers/SessaoController';

const sessaoRouter = Router();
const sessaoController = new SessaoController();

sessaoRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
    },
  }),
  sessaoController.create,
);

export default sessaoRouter;
