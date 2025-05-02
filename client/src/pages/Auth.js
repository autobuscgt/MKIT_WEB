import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import mkit_logo from '../static/MKIT_LOGO.svg'
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../utils/consts';
import { observer } from "mobx-react-lite";
import { Authorization, registration } from '../http/userAPI';
import { useContext, useState } from 'react';
import {Context} from '..'
const Auth = observer(() => {
  const {user} = useContext(Context)
  const [login,setLogin] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate('/')
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const click  = async ()=> {
    try
     {
      if(isLogin){
       const data = await Authorization(login,password)
      } 
      else {
        const data = await registration(login,password)
      } 
      user.setUser(user)
      user.setIsAuth(true)
      navigate('/')
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }
    return (
      <div className="auth_container">
        <ul className="auth_ul">
          <li className="centered">        <img src={mkit_logo} alt='mkit_logo' className='auth_logo'/> </li>
          <li className="auth_ul">{isLogin ? 'Авторизация' : 'Регистрация'}</li>
          <li className="auth_ul">        
            <input placeholder="Введите логин" value={login} onChange={e => setLogin(e.target.value)}>
            </input> 
            </li>
          <li className="auth_ul">       
             <input placeholder="Введите пароль" type='password'value={password} onChange={e => setPassword(e.target.value)}></input>
          </li>
          <li className="auth_ul">        {isLogin ? <button className='auth_btn' onClick={click}>Войти</button>
                                          :<button className='auth_btn' onClick={click}>Регистрация</button>}
          </li>
          <li className="auth_ul">
          {isLogin ? <NavLink className={'register_btn'} to={REGISTER_ROUTE}>Зарегистрироваться</NavLink>
          :
          <NavLink className={'register_btn'} to={LOGIN_ROUTE}>Войти?</NavLink>
          }
          </li>
        </ul>
      </div>
    );
  })
  
  export default Auth;
  