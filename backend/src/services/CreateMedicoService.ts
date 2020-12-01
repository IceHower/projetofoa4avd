
import Medico from '../models/Medico';
import { getRepository } from 'typeorm';

interface Request {
    name: string,
    speciality: string;
}

class CreateMedicoService {
    public async execute({name, speciality}: Request): Promise<Medico> { 
        const medicosRepository  = getRepository(Medico);
        const medico = medicosRepository.create({name, speciality});
        await medicosRepository.save(medico);

        return medico
    }
}

export default CreateMedicoService;