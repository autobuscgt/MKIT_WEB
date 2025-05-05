import {Routes,Route, Navigate} from 'react-router'
import { authRoutes, publicRoutes,  } from '../routes';
import { HOMEPAGE_ROUTE } from '../utils/consts';
import { useContext } from 'react';
import { Context } from '..';
import { observer } from "mobx-react-lite";
const AppRouter = observer(() => {
  const {user} = useContext(Context)
    return (
      <Routes>
        {user.isAuth && authRoutes.map(({path,Component})=>
        <Route key={path} path={path} Component={Component} exact/>
        )}
        {publicRoutes.map(({path,Component})=>
        <Route key={path} path={path} Component={Component} exact/>
        )}
        <Route path='*' element={<Navigate to={HOMEPAGE_ROUTE} replace/>}/>
      </Routes>
    );
  })
  
  export default AppRouter;
  