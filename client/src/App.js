import {BrowserRouter} from 'react-router-dom'
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import './styles/styles.css'
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { check } from './http/userAPI';
import { Spinner } from 'react-bootstrap';

const App = observer(() => {
  const {user} = useContext(Context)
  const [loading,setLoading] = useState(true)
    useEffect(()=>{
      check().then(userData =>{
        user.setUser(userData)
        user.setIsAuth(true)
      }).finally(()=> setLoading(false))
    },[user])
  if(loading){
    return <Spinner animation={'grow'}></Spinner>
  }
  return (
    <BrowserRouter>
    <NavBar/>
    <AppRouter/>
 
    </BrowserRouter>
  );
})

export default App;