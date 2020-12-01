import { Router, Response, Request } from 'express'; // Importa o router, Response e request para definir os tipos do paramentro
import Consulta from '../models/Consulta';
import {getRepository} from 'typeorm';
import CreateConsultaService from '../services/CreateConsultaService';
import AppError from '../errors/AppError';
import { parseISO } from 'date-fns';


const consultasRouter = Router();
const createConsulta = new CreateConsultaService(); 

consultasRouter.post('/', async(request : Request, response : Response) => { 
    const { medic_name, pacient_name, speciality , date} = request.body;
    const parsedDate = parseISO(date);
    const consulta = await createConsulta.execute({ medic_name, pacient_name, speciality, date: parsedDate }); 
    return response.json(consulta);
});

consultasRouter.get('/', async (request: Request, response: Response) => { 
    const consultasRepository = getRepository(Consulta);
    const consulta = await consultasRepository.find(); 
    return response.json(consulta); // retorna um json com o resultado obtido.
});

consultasRouter.get('/:id', async (request, response) => {
    try {
    const {id} = request.params;
    const consultasRepository = getRepository(Consulta);
    const consulta = await consultasRepository.findOne( { id });

    return response.json(consulta);
    }
    catch(err) {
            throw new AppError('Não foi possivel localizar a consulta)', 404);
    }
});


//ALTERAR
consultasRouter.patch('/:id',  async(request: Request, response: Response) => { 
    try {
            const { id } = request.params;
            const consultasRepository = getRepository(Consulta);
            const consulta = await consultasRepository.findOne({ id });
            
     
            const {pacient_name, medic_name, date, speciality} = request.body;
            const parsedDate = parseISO(date);
    
            consulta.pacient_name = pacient_name;
            consulta.medic_name = medic_name;
            consulta.date = parsedDate;
            consulta.speciality = speciality;

            await consultasRepository.save(consulta); // Salva no banco de dados     
            return response.json(consulta);
    }
    catch(err) {
            throw new AppError('Não foi possivel localizar a consulta)', 404);
    }
    
});

consultasRouter.delete('/:id', async(request: Request, response: Response) => {
    const {id} = request.params;
    const consultasRepository = getRepository(Consulta);
    const consulta = await consultasRepository.findOne({ id });
    consultasRepository.remove(consulta);

    response.json({ok: true});
});

export default consultasRouter; // exporta a variavel