import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import mkit_logo from '../static/MKIT_LOGO.svg'
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../utils/consts';
import { observer } from "mobx-react-lite";
import { Authorization, registration } from '../http/userAPI';
import { useContext, useState } from 'react';
import { Context } from '..'
import { jwtDecode } from 'jwt-decode';

const Auth = observer(() => {
  const { user } = useContext(Context)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigate = useNavigate('')
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE

  const validateForm = () => {
    let isValid = true
    if (!login.trim()) {
      setLoginError('Поле обязательно для заполнения')
      isValid = false
    }
    if (!password.trim()) {
      setPasswordError('Поле обязательно для заполнения')
      isValid = false
    }
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      let data;
      if (isLogin) {
        data = await Authorization(login, password);
      } else {
        data = await registration(login, password);
      }
      
      user.setUser(user); 
      user.setIsAuth(true);
      navigate('/profile'); 
    } catch (error) {
      alert(error?.response?.data?.message || 'Произошла ошибка');
    }
  };

  return (
    <div className="auth_container">
      <form className="auth_form" onSubmit={handleSubmit}>
        <ul className="auth_ul">
          <li className="centered">
            <img src={mkit_logo} alt='mkit_logo' className='auth_logo'/>
          </li>
          <li className="auth_ul">{isLogin ? 'Авторизация' : 'Регистрация'}</li>
          
          <li className="auth_ul">
            <input 
              placeholder="Введите логин" 
              value={login} 
              onChange={e => {
                setLogin(e.target.value)
                setLoginError('')
              }}
              onBlur={() => !login && setLoginError('Поле обязательно для заполнения')}
            />
            {loginError && <div className="error-message">{loginError}</div>}
          </li>
          
          <li className="auth_ul">
            <input 
              placeholder="Введите пароль" 
              type='password'
              value={password} 
              onChange={e => {
                setPassword(e.target.value)
                setPasswordError('')
              }}
              onBlur={() => !password && setPasswordError('Поле обязательно для заполнения')}
            />
            {passwordError && <div className="error-message">{passwordError}</div>}
          </li>
          
          <li className="auth_ul">
            {isLogin ? 
              <button className='auth_btn' type="submit">Войти</button> :
              <button className='auth_btn' type="submit">Регистрация</button>
            }
          </li>
          
          <li className="auth_ul">
            {isLogin ? 
              <NavLink className={'register_btn'} to={REGISTER_ROUTE}>Зарегистрироваться</NavLink> :
              <NavLink className={'register_btn'} to={LOGIN_ROUTE}>Войти?</NavLink>
            }
          </li>
        </ul>
      </form>
    </div>
  );
})

export default Auth;