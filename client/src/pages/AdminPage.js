import { useState } from "react";
import CreateEvents from "../components/modals/CreateEvents";
import CreateGroup from "../components/modals/CreateGroup";
import CreateHM from "../components/modals/CreateHM";
import CreateSchedule from "../components/modals/CreateSchedule";
import { observer } from "mobx-react-lite";
import DeleteSchedule from "../components/modals/delete/DeleteSchedule";

const AdminPage = observer(()=> {
  const [schedule_visible,setSchedule_visible] = useState(false)
  const [group_visible,setGroup_visible] = useState(false)
  const [events_visible,setEvents_visible] = useState(false)
  const [homework_visible,setHomework_visible] = useState(false)
  const [scheduleDestroy,setScheduleDestroy] = useState(false)
    return (
      <div className="admin_form">
        <ul className="admin_ul">
          <li className="admin_ul">
          <button className="admin_btn"  style={{padding
            :'0px',width:'100%'}} onClick={() => setSchedule_visible(true)}>Добавить расписание</button>
          </li>
          <li className="admin_ul">
          <button className="admin_btn"  style={{padding
            :'0px',width:'100%'}} onClick={() => setGroup_visible(true)}>Добавить группу</button>
          </li>
          <li className="admin_ul">
          <button className="admin_btn"  style={{padding
            :'0px',width:'100%'}} onClick={() => setHomework_visible(true)}>Добавить ДЗ</button>
          </li>
          <li className="admin_ul">
          <button className="admin_btn" style={{padding
            :'0px',width:'100%'}} onClick={() => setEvents_visible(true)}>Добавить событие</button>
          </li>
          <li className="admin_ul">
            <button className="admin_btn" style={{padding
            :'0px',width:'100%'}} id="delete_btn" onClick={()=>setScheduleDestroy(true)}>Очистить расписание</button>
          </li>
        </ul>
            <DeleteSchedule show={scheduleDestroy} onHide={()=>setScheduleDestroy(false)}/>
            <CreateEvents show={events_visible} onHide={()=>setEvents_visible(false)}/>
            <CreateHM show={homework_visible} onHide={()=>setHomework_visible(false)}/>
            <CreateGroup show={group_visible} onHide={()=>setGroup_visible(false)}/>
            <CreateSchedule show={schedule_visible} onHide={()=>setSchedule_visible(false)}/>
      </div>
    );
  })
  
  export default AdminPage;
  