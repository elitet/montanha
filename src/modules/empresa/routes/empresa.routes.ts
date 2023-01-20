import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import EmpresaController from '../controllers/EmpresaController';
import EmpresaLogoController from '../controllers/EmpresaLogoController';

const empresaRouter = Router();
const empresaController = new EmpresaController();
const empresaLogoController = new EmpresaLogoController();

const upload = multer(uploadConfig);

empresaRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  empresaController.show,
);

empresaRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      endereco: Joi.string().required(),
      bairro: Joi.string().required(),
      numero: Joi.string().required(),
      cep: Joi.string().required(),
      cidade: Joi.string().required(),
      estado: Joi.string().required(),
      cnpj: Joi.string().required(),
      telefone: Joi.string().required(),
      email: Joi.string().required(),
      site: Joi.string().allow(null, ''),
      facebook: Joi.string().allow(null, ''),
      instagram: Joi.string().allow(null, ''),
      status: Joi.number().default(1),
    },
  }),
  empresaController.create,
);

empresaRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      endereco: Joi.string().required(),
      numero: Joi.string().required(),
      bairro: Joi.string().required(),
      cep: Joi.string().required(),
      cidade: Joi.string().required(),
      estado: Joi.string().required(),
      cnpj: Joi.string().required(),
      telefone: Joi.string().required(),
      email: Joi.string().required(),
      site: Joi.string().allow(null, ''),
      facebook: Joi.string().allow(null, ''),
      instagram: Joi.string().allow(null, ''),
      status: Joi.number().default(1),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  empresaController.update,
);

empresaRouter.patch(
  '/logo/:id',
  upload.single('logo'),
  empresaLogoController.update,
);

export default empresaRouter;
