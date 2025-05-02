import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
function HomeworkPage() {
  const {id} = useParams()
  const navigate = useNavigate();
  const {homework} = useContext(Context)
  useEffect(()=>{
    if(!homework.homeworks || homework.homeworks.lenght === 0){

    }
  },[id,homework])
  const currentEvent = homework.homeworks?.find(e => e.id === parseInt(id));

  if (!currentEvent) {
    return <div>Домашнее задание не найдено</div>;
  }

  return (
    <div className='event-page'>
      <button onClick={() => navigate(-1)} className="back-button">
        ← Назад
      </button>
      <div>
          <ul>
            <li><h2>{currentEvent.lesson}</h2></li>
            <li>{currentEvent.description}</li>
          </ul>
      </div>
    </div>
  );
}

export default HomeworkPage;