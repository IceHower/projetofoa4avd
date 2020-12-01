
import Paciente from '../models/Paciente';
import { getRepository } from 'typeorm';

interface Request {
    name: string
}

class CreatePacienteService {
    public async execute({name }: Request): Promise<Paciente> { 
        const pacientesRepository  = getRepository(Paciente);
        const paciente = pacientesRepository.create({name});
        await pacientesRepository.save(paciente);

        return paciente
    }
}

export default CreatePacienteService;