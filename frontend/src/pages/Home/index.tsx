import React, {useState, useEffect, FormEvent} from 'react';
import api from '../../services/Api';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import FavoriteList from '../../Components/FavoriteList';
import IConsultas from '../../services/Interfaces';
import IPaciente from '../../services/Interfaces';
import Container, {Card} from './styles';
import { Combobox, DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment'
import 'react-widgets/dist/css/react-widgets.css';
import { parseISO } from 'date-fns';

Moment.locale('en')
momentLocalizer();

interface IMedico {
    id: string;
    name: string;
    speciality: string;
}

const Home: React.FC = () => {
    // Minha key para acessar a api.
    const [consultas, setConsultas] = useState<IConsultas[]>([]);
    const [medico, setMedico] = useState<IMedico[]>([]);
    const [selectedMed, setSelectedMed] = useState<IMedico[]>([]);
    const [speciality, setSpeciality] = useState<string[]>();
    const [paciente, setPaciente] = useState<IPaciente[]>([]);

    const [medicoValue, setMedicoValue] = useState<string>('');
    const [specialityValue, setSpecialityValue] = useState<string>('');
    const [pacientValue, setPacientValue] = useState<string>('');
    const [dateValue, setDateValue] = useState<string>('');

    const [medicoValueA, setMedicoValueA] = useState<string>('');
    const [pacientValueA, setPacientValueA] = useState<string>('');
    const [dateValueA, setDateValueA] = useState<string>('');

    const [alterar, setAlterar] = useState<boolean>(true);
    const [alterarID, setAlterarID] = useState<string>('');

   useEffect(()=> {
        api.get('consultas').then(response => {
            setConsultas(response.data);
        });   
        api.get('medicos').then(response => {
            setMedico(response.data);
        });
        api.get('pacientes').then(response => {
            setPaciente(response.data);
        });    
   }, []);

   useEffect(() => {
    const speciality = selectedMed.map(selectedMed => selectedMed.speciality);
    setSpeciality(speciality);
   }, [selectedMed])

    function handleSelectedMedico(value: IMedico) {
        setSelectedMed([value]);
        setMedicoValue(value.name);
        setSpecialityValue(value.speciality)
    }

    function handlePacientValue(value: IPaciente) {
        setPacientValue(value.name);
    }

    function handleDateValue(value: any) {
        const parsedDate = value.toISOString();
        setDateValue(parsedDate);
    }

    async function handleSubmit(e: FormEvent) {

        const data = {
            pacient_name: pacientValue,
            medic_name: medicoValue,
            speciality: specialityValue,
            date: dateValue
        };
        await api.post('consultas', data);
        }
    
    async function handleDelete(id: string) {
        await api.delete('consultas/' + id);
        setConsultas(consultas.filter(consulta => consulta.id !== id));
    }

    async function handleAlterate(id: string, dateValue:string) {
        const data = {
            pacient_name: pacientValue,
            medic_name: medicoValue,
            speciality: specialityValue,
            date: dateValue
        };
        await api.patch('consultas/' + id, data);
        setAlterar(true);
        setAlterarID('');
    }

  
    return(
        <>
            <Header/>
            <FavoriteList title='AGENDAR CONSULTA' title2='CONSULTAS AGENDADAS'>
                <Container> 
                <form onSubmit={handleSubmit}>
                    <Combobox
                        data={paciente}
                        textField='name'
                        valueField='name'
                        placeholder='Paciente'
                        onChange={handlePacientValue}
                        
                    />

                    <Combobox
                        data={medico}
                        textField='name'
                        onChange={handleSelectedMedico}
                        valueField='name'
                        placeholder='Médico'
                    />

                    <Combobox
                        readOnly
                        data={speciality}
                        textField='speciality'
                        value={speciality}
                        placeholder='Especialidade'
                    />
                    
                    <DateTimePicker
                        onChange={handleDateValue}
                    />

                <button className='button' type='submit'>
                    Marcar Consulta
                </button>
                
                </form>
                </Container>
                
            </FavoriteList>
            
            <Container >
                {consultas.map(consulta => 
                <Card>
                    <div key={consulta.id}>
                            <p>Paciente: </p>
                            <Combobox
                            data={paciente}
                            readOnly={alterar}
                            onChange={handlePacientValue}
                            textField='name'
                            valueField='name'
                            defaultValue={consulta.pacient_name}
                            />
                           <p>Médico: </p>
                           <Combobox
                            readOnly={alterar}
                            data={medico}
                            onChange={handleSelectedMedico}
                            textField='name'
                            defaultValue={consulta.medic_name}
                            />
                            <p>Especialidade: </p>
                            <Combobox
                            readOnly
                            data={speciality}    
                            textField='speciality'
                            defaultValue={consulta.speciality}
                            />
                            <p>Data Consulta: </p>
                            <DateTimePicker
                            readOnly={alterar}
                            defaultValue={parseISO(consulta.date)}
                            onChange={handleDateValue}
                            />
                           
                       </div>   
                       <button onClick={() => handleDelete(consulta.id)}>Excluir</button>
                       <button onClick={() => {
                           setAlterar(false)
                           setAlterarID(consulta.id);
                       }}>Alterar</button>
                       {alterar == false && alterarID == consulta.id &&
                       <button onClick={() => {handleAlterate(consulta.id, consulta.date)}}>Confirmar</button>
                       }
                </Card>    
                )}
            </Container>
            <Footer/>

           
        </>
    )
}


export default Home;