import { useNavigate } from 'react-router-dom';
import lesson_folder from '../static/folder.svg';
import { HOMEWORKID_ROUTE } from '../utils/consts';
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from 'react';
import { Context } from '..';
import { fetchHomework } from '../http/homeworkAPI';
import { toJS } from 'mobx';
import PagesHomework from '../components/Pageshomework';

const HomeWork = observer(() => {
  const { groups, homework } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const groupId = groups.selectedGroupId;
        const page = homework.page; 
        const limit = homework.limit;

        const data = await fetchHomework(groupId, page, limit);
        if (data && data.homeworks) {
          homework.setHomeworks(data.homeworks);
          homework.setTotalCount(data.total);
          homework.setTotalPages(Math.ceil(data.total / limit));
        }
      } catch (e) {
        console.error('Ошибка загрузки:', e);
      }
    };

    loadData();
  }, [groups.selectedGroupId, homework.page, homework.limit]); 

  const homeworkData = toJS(homework.homeworks) || [];
  if(!homeworkData){
    <div>
      ДЗ 
    </div>
  }
  return (
    <div className='center'>
    <div>
      <div className='center'>
        <div className='main_container'>
          {homeworkData.map((lesson) => (
            <div 
              key={lesson.id} 
              className='homework_cards' 
              onClick={() => navigate(`${HOMEWORKID_ROUTE}/${lesson.id}`)}
            >
              <ul style={{ padding: 0 }}>
                <li style={{ padding: 0 }}>
                  <img src={lesson_folder} alt='folder_ico' />
                </li>
                <li style={{ padding: 0 }}>
                  {lesson.lesson}
                </li>
              </ul>
            </div>
          ))}
              <PagesHomework style={{marginTop:'2%'}}/>
        </div>
      </div>
    </div>
    </div>
  );
});

export default HomeWork;