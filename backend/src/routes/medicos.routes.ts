import { Router, Response, Request } from 'express'; // Importa o router, Response e request para definir os tipos do paramentro
import CreateMedicoService from '../services/CreateMedicoService'
import {getRepository} from 'typeorm';
import AppError from '../errors/AppError';
import Medico from '../models/Medico';

const medicosRouter = Router(); // define uma variavel para inicializar o router
const createMedico = new CreateMedicoService(); 

medicosRouter.post('/', async(request : Request, response : Response) => { 
        const { name, speciality } = request.body;
        const medico = await createMedico.execute({ name, speciality }); 
        return response.json(medico);
});

medicosRouter.get('/', async (request: Request, response: Response) => { 
    const medicosRepository = getRepository(Medico);
    const medico = await medicosRepository.find(); 
    return response.json(medico); // retorna um json com o resultado obtido.
});

medicosRouter.get('/:id', async (request, response) => {
    try {
    const {id} = request.params;
    const medicosRepository = getRepository(Medico);
    const medico = await medicosRepository.findOne( { id });

    return response.json(medico);
    }
    catch(err) {
            throw new AppError('Não foi possivel localizar o dependente)', 404);
    }
});


//ROTA DE DELETAR

medicosRouter.delete('/:id', async(request: Request, response: Response) => {
    const {id} = request.params;
    const medicosRepository = getRepository(Medico);
    const medico = await medicosRepository.findOne({ id });
    medicosRepository.remove(medico);

    response.json({ok: true});
});
export default medicosRouter; // exporta a variavel