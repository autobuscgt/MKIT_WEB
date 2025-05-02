import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "../index";

const EventPage = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { event } = useContext(Context);
  
  useEffect(() => {
    if (!event.events || event.events.length === 0) {
    }
  }, [id, event]);

  const currentEvent = event.events?.find(e => e.id === parseInt(id));

  if (!currentEvent) {
    return <div>Событие не найдено</div>;
  }

  return (
    <div className="event-page">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Назад
      </button>
      
      <div className="event-content">
        <img 
          src={currentEvent.image} 
          alt={currentEvent.name} 
          className="event-image"
        />
        <h3>{currentEvent.name}</h3>
        <p className="event-date">
          Дата: {new Date(currentEvent.day_of_week).toLocaleDateString('ru-RU')}
        </p>
        <p className="event-description">{currentEvent.description}</p>
      </div>
    </div>
  );
});

export default EventPage;