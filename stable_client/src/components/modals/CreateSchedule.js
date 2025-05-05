import Modal from 'react-bootstrap/Modal'
import {Button, Dropdown} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import { useState } from 'react'
import { createSchedule } from '../../http/scheduleAPI' // Предполагается, что функция создана

function CreateSchedule({show, onHide}) {
  const [day, setDay] = useState('')
  const [lesson, setLesson] = useState('')
  const [timetable, setTimetable] = useState('')
  const [groupId, setGroupId] = useState('')

  // Исправлены id для уникальности
  const schedules = [
    {id:1, timetable:'9:00-9:45'},
    {id:2, timetable:'9:50-10:35'},
    {id:3, timetable:'10:45-11:30'},
    {id:4, timetable:'12:40-13:25'},
  ]

  const days = [
    {id:1, day:'Понедельник'},
    {id:2, day:'Вторник'},
    {id:3, day:'Среда'},
    {id:4, day:'Четверг'},
    {id:5, day:'Пятница'},
  ]

  const handleSubmit = async () => {
    try {
      if (!day || !timetable || !lesson || !groupId) {
        return alert('Заполните все обязательные поля!')
      }

      await createSchedule({
        day,
        lesson,
        timetable,
        groupId: Number(groupId)
      })
      
      alert('Расписание успешно добавлено!')

    } catch (error) {
      alert(error.response?.data?.message || 'Ошибка при создании расписания!')
      console.error(error)
    }
  }

  return (
    <Modal 
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className='modal_centered'
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={{color:'#484848'}}>
          Добавить расписание
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className='dropdown mb-3'>
            <Dropdown.Toggle variant="secondary">
              {day || 'Выберите день'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {days.map((item) => (
                <Dropdown.Item 
                  key={item.id}
                  onClick={() => setDay(item.day)}
                >
                  {item.day}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className='dropdown mb-3'>
            <Dropdown.Toggle variant="secondary">
              {timetable || 'Выберите время'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {schedules.map((schedule) => (
                <Dropdown.Item 
                  key={schedule.id}
                  onClick={() => setTimetable(schedule.timetable)}
                >
                  {schedule.timetable}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Control
            placeholder="Введите ID группы"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            className="mb-3"
            type="number"
          />

          <Form.Control
            placeholder="Введите название лекции"
            value={lesson}
            onChange={(e) => setLesson(e.target.value)}
            className="mb-3"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} className='red_btn'>Закрыть</Button>
        <Button onClick={handleSubmit} className='green_btn'>Добавить</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateSchedule