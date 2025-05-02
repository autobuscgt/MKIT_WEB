import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import ScheduleStore from './store/ScheduleStore';
import EventStore from './store/EventStore';
import HomeworkStore from './store/HomeworkStore';
import GroupStore from './store/GroupStore';
import Footer from './components/Footer';
export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      schedule: new ScheduleStore(),
      user: new UserStore(),
      event: new EventStore(),
      homework: new HomeworkStore(),
      groups: new GroupStore()
    }}>
    <App></App>
    <Footer/>
    </Context.Provider>
    
  </React.StrictMode>
);
