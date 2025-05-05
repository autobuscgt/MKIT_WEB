import './Footer.css'
import { observer } from "mobx-react-lite";
import scream from '../static/scream.avif'
const Footer = observer(() => {
    return (
        <footer>

            <table className='foooter_table'>
                
                <tbody>
                <tr>
                    <td style={{textAlign:'center'}}>Контакты:</td>
                    <td style={{textAlign:'center'}}>Адрес:</td>
                    <td style={{textAlign:'center'}}>Email:</td>
                    <td style={{textAlign:'center'}}>График работы:</td>
                </tr>
                <tr>
           
                    <td style={{fontSize:'15px'}}>+7(499)584-44-16</td>
                    <td style={{fontSize:'15px'}}>Нижегородская 32,стр.4</td>
                    <td style={{fontSize:'15px'}}>info@mkit.online</td>
                    <td style={{fontSize:'15px'}}>Понедельник – Пятница с 08:30 до 17:00.</td>
                </tr>
                </tbody>



            </table>
        </footer>
    );
  })
  
  export default Footer;
  