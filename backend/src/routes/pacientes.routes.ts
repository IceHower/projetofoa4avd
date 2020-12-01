import { Router, Response, Request } from 'express'; // Importa o router, Response e request para definir os tipos do paramentro
import CreatePacienteService from '../services/CreatePacienteService'
import {getRepository} from 'typeorm'
import AppError from '../errors/AppError';
import Paciente from '../models/Paciente';

const pacientesRouter = Router(); // define uma variavel para inicializar o router
const createPaciente = new CreatePacienteService(); 

pacientesRouter.post('/', async(request : Request, response : Response) => { 
        const { name } = request.body;
        const paciente = await createPaciente.execute({ name }); 
        return response.json(paciente);
});

pacientesRouter.get('/', async (request: Request, response: Response) => { 
    const pacientesRepository = getRepository(Paciente);
    const paciente = await pacientesRepository.find(); 
    return response.json(paciente); // retorna um json com o resultado obtido.
});

pacientesRouter.get('/:id', async (request, response) => {
    try {
    const {id} = request.params;
    const pacientesRepository = getRepository(Paciente);
    const paciente = await pacientesRepository.findOne( { id });

    return response.json(paciente);
    }
    catch(err) {
            throw new AppError('Não foi possivel localizar o dependente)', 404);
    }
});


//ROTA DE DELETAR

pacientesRouter.delete('/:id', async(request: Request, response: Response) => {
    const {id} = request.params;
    const pacientesRepository = getRepository(Paciente);
    const paciente = await pacientesRepository.findOne({ id });
    pacientesRepository.remove(paciente);

    response.json({ok: true});
});
export default pacientesRouter; // exporta a variavel