import '../styles/styles.css'
import timetable from '../static/timetable.svg'
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import { fetchEvents } from '../http/eventsAPI';
import x_btn from '../static/admin components/x_btn.svg'
import edit from '../static/admin components/edit.svg'
import DeleteEvents from '../components/modals/delete/deleteEventsModal';
import UpdateEvents from '../components/modals/update/UpdateEvents';
import { toJS } from 'mobx';
import { Link } from 'react-router-dom';
import Pages from '../components/Pages';
const Events = observer(() => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  
  const { event, user } = useContext(Context);
  const isAdmin = user.user?.role === 'Admin';

    useEffect(() => {
      fetchEvents(event.pages,8).then(data => {
        if (data && Array.isArray(data.events)) {
          event.setEvents(data.events);

        } else if (Array.isArray(data)) {
          event.setEvents(data);
        } else {
          console.error('Unexpected data format:', data);
          event.setEvents([]);
        }
        event.setPage(data.pages)
        event.setTotalCount(data.total)

      });
    }, [event]);
    useEffect(()=>{
      fetchEvents(event.pages, 8).then(data =>{
        event.setEvents(data.events)
        event.setTotalCount(data.total)
      })
      
    },[event.pages])
  const handleDelete = (id) => {
    setSelectedEventId(id);
    setDeleteModal(true);
  };

  const handleUpdate = (id) => {
    setSelectedEventId(id);
    setUpdateModal(true);
  };

  const eventData = toJS(event.events);
  const eventsArray = Array.isArray(eventData?.events) 
  ? eventData.events 
  : Array.isArray(eventData) 
    ? eventData 
    : [];
  if (eventData.length === 0) {
    return <div>Loading or no events available...</div>;
  }
  return (
    <div className='main_container'>

      {eventsArray.map(eventItem => (
        <div key={eventItem.id} className='event'>
          <div className='events_card'>
          <Link to={`${eventItem.id}`}>
            <img src={eventItem.image} alt="event" className='events_card_images'/>
          </Link>
            <p className='events_name'>{eventItem.name}</p>
            <p className='ellipsis'>{eventItem.description}</p>
            <p className='timetable_container'>
              <img src={timetable} alt='timetable_icon' className='timetable_ico'/>
              <p>{new Date(eventItem.day_of_week).toLocaleDateString('ru-RU')}</p>
            </p>
            
            {isAdmin && (
              <div className='admin_btns'>
                <button className='none' onClick={() => handleUpdate(eventItem.id)}>
                  <img src={edit} className='admin_button' alt='edit' />
                </button>
                <button onClick={() => handleDelete(eventItem.id)} className='none'>
                  <img src={x_btn} className='admin_button' alt='delete'/>
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
      <Pages/>
      <DeleteEvents 
        show={deleteModal} 
        onHide={() => setDeleteModal(false)} 
        onConfirm={() => {
          event.deleteEvent(selectedEventId);
          setDeleteModal(false);
        }}
      />
      
      <UpdateEvents 
        show={updateModal}
        onHide={() => setUpdateModal(false)}
        eventId={selectedEventId}
      />
    </div>
  );
});

export default Events;
  