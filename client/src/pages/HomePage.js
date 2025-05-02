import homework from '../static/homepage/homework.svg'
import events from '../static/homepage/events.svg'
import main_web_site from '../static/homepage/main_web_site.svg'
import schedule from '../static/homepage/schedule.svg'
import { NavLink } from 'react-router-dom';
import { EVENTS_ROUTE, HOMEWORK_ROUTE, SCHEDULE_ROUTE } from '../utils/consts';
import { mkit } from '../utils/links';
import { observer } from "mobx-react-lite";
import { useContext } from 'react';
import {Context} from '..'
import { mkit_telegram,mkit_vk_group } from '../utils/links';
import tg_icon from '../static/web_icons/telegram.svg'
import vk_icon from '../static/web_icons/vkontakte.svg'
import Banner from '../components/Banner';
const HomePage = observer(()=> {
  const {user} = useContext(Context)
    return (
      <div>

      <Banner></Banner>
      <div className='centered'>

        <div className='main_logos'>
          <div className='centered'>
          <table className='centered'>
            <tbody className='main_table'>
    {user.isAuth && (
      <tr className="desktop-row">
        <td><NavLink to={HOMEWORK_ROUTE}>
          <img src={homework} alt='pzls_logo' id='img1'/>
        </NavLink></td>
        <td>
          <NavLink to={SCHEDULE_ROUTE}>
            <img src={schedule} alt='pzls_logo' id='img2'/>
          </NavLink>
        </td>
        <td>
          <NavLink to={EVENTS_ROUTE}>
            <img src={events} alt='pzls_logo' id='img3'/>
          </NavLink>
        </td>
        <td>
          <NavLink to={mkit}><img src={main_web_site} alt='pzls_logo' id='img4'/></NavLink>
        </td>
      </tr>
    )}
    
    {/* Мобильная версия */}
    {user.isAuth && (
      <>
        <tr className="mobile-row">
          <td><NavLink to={HOMEWORK_ROUTE}>
            <img src={homework} alt='pzls_logo' id='img1'/>
          </NavLink></td>
          <td>
            <NavLink to={SCHEDULE_ROUTE}>
              <img src={schedule} alt='pzls_logo' id='img2'/>
            </NavLink>
          </td>
        </tr>
        <tr className="mobile-row">
          <td>
            <NavLink to={EVENTS_ROUTE}>
              <img src={events} alt='pzls_logo' id='img3'/>
            </NavLink>
          </td>
          <td>
            <NavLink to={mkit}><img src={main_web_site} alt='pzls_logo' id='img4'/></NavLink>
          </td>
        </tr>
      </>
    )}
    
    {!user.isAuth && (
      <tr className="desktop-row">
        <td>
          <NavLink to={EVENTS_ROUTE}>
            <img src={events} alt='pzls_logo'/>
          </NavLink>
        </td>
        <td>
          <NavLink to={mkit}><img src={main_web_site} alt='pzls_logo'/></NavLink>
        </td>
      </tr>
    )}
  </tbody>
</table>
          
          </div>

          <p className='description'>
          Твой надежный помощник в мире учебы. Мы создали этот сервис, чтобы помочь студентам:<br/>
          ✅ Быстро получать доступ к расписанию<br/>
          ✅ Удобно отслеживать домашние задания<br/>
          ✅ Находить материалы для подготовки<br/>
          ✅ Общаться с одногруппниками<br/>
          Здесь всё, что нужно для комфортной учебы — без лишней сложности.<br/>
          Начни использовать MKIT_WEB_APP прямо сейчас и почувствуй разницу! 🚀<br/>
          Учись умнее, а не сложнее.
        </p>
        <div className='homepage_icons'>
         <ul  className='nav_ul_icons'>
        <li className='nav_ul_icons'><NavLink to={mkit_telegram}><img src={tg_icon} alt='link_icon' style={{width:'50px',marginBottom:'2%'}}/></NavLink></li>
        <li  className='nav_ul_icons'><NavLink to={mkit_vk_group}><img src={vk_icon} alt='link_icon' style={{width:'50px',marginBottom:'2%'}}/></NavLink></li>
        <li  className='nav_ul_icons'>Наши соцсети</li>

          </ul> 
        </div>


        </div>



      </div>
      </div>
    );
  })
  
  export default HomePage;
  