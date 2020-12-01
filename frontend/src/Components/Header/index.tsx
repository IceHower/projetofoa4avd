import React from 'react';
import Logo from '../../assets/logo.png';
import HeaderStyle from './styles';

const Header: React.FC = () => {

    return(
        <>
            <HeaderStyle>
                <table>
                    <tbody>
                        <tr>
                            <td><img src={Logo} alt="clapper"/></td>
                            <td className='title'>Consultas Médicas</td>
                        </tr>
                    </tbody>
                </table>   
            </HeaderStyle>
        </>
    )

}

export default Header;