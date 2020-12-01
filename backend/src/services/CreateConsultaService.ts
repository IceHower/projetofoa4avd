import Consulta from '../models/Consulta';
import  { startOfHour } from 'date-fns';
import { getRepository } from 'typeorm'

interface Request { 
    medic_name: string,
    pacient_name: string,
    speciality: string,
    date: Date,
 }

class CreateConsulaService {
    public async execute({date, medic_name, pacient_name, speciality} : Request): Promise<Consulta> {
        const consultaRepository = getRepository(Consulta);
        const appointmentDate = startOfHour(date); //Seta o agendademento de hora em hora. // Aqui é uma regra de negócio.


         const consulta = consultaRepository.create({ // O metodo create só cria uma instancia no banco de dados, mas não salva.
         medic_name,
         pacient_name,
         speciality,
         date: appointmentDate
        }); //Usa o metodo create da appointmentsRepository passando o provider e a parsedDate.

        await consultaRepository.save(consulta); 

        return consulta;
    }
}


export default CreateConsulaService;