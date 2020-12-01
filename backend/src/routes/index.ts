import { Router } from 'express';
import medicosRouter from './medicos.routes'
import pacientesRouter from './pacientes.routes'
import consultasRouter from './consultas.routes'

const routes = Router();
routes.use('/medicos', medicosRouter);
routes.use('/pacientes', pacientesRouter);
routes.use('/consultas', consultasRouter);
export default routes;
