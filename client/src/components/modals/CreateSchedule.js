import Modal from 'react-bootstrap/Modal'
import {Button, Form} from 'react-bootstrap'
import { useContext, useState } from 'react'
import { createSchedule } from '../../http/scheduleAPI'
import { Context } from '../..'

function CreateSchedule({show, onHide}) {
  const [selectedDays, setSelectedDays] = useState([])
  const [selectedTimetables, setSelectedTimetables] = useState([])
  const [lesson, setLesson] = useState('')
  const [groupId, setGroupId] = useState('')
  const {groups} = useContext(Context)
  const selectedGroup = groups.groups?.find(g => g.id === Number(groupId))

  const schedules = [
    {id:1, timetable:'9:00-9:45 ._(5 минут перерыв)_. 9:50-10:35'},
    {id:2, timetable:'10:45-11:30 ._(5 минут перерыв)_. 11:35-12:20'},
    {id:3, timetable:'12:40-13:25 ._(5 минут перерыв)_. 13:30-14:15'},
    {id:4, timetable:'14:25-15:10 ._(5 минут перерыв)_. 15:15-16:00'},
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
      if (selectedDays.length === 0 || 
          selectedTimetables.length === 0 || 
          !lesson || 
          !groupId) {
        return alert('Заполните все обязательные поля!')
      }
      const schedulesToCreate = []
      selectedDays.forEach(day => {
        selectedTimetables.forEach(timetable => {
          schedulesToCreate.push({
            day,
            lesson,
            timetable,
            groupId: Number(groupId)
          })
        })
      })
      await Promise.all(schedulesToCreate.map(schedule => 
        createSchedule(schedule)
      ))
      
      alert(`Успешно добавлено ${schedulesToCreate.length} расписаний!`)
      setSelectedDays([])
      setSelectedTimetables([])
      setLesson('')
      setGroupId('')
    } catch (error) {
      alert(error.response?.data?.message || 'Ошибка при создании расписаний!')
      console.error(error)
    }
  }

  const toggleDay = (day) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day) 
        : [...prev, day]
    )
  }

  const toggleTimetable = (timetable) => {
    setSelectedTimetables(prev => 
      prev.includes(timetable) 
        ? prev.filter(t => t !== timetable) 
        : [...prev, timetable]
    )
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
        <Modal.Title style={{color:'#484848'}}>
          Добавить расписание (множественный выбор)
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Дни недели:</Form.Label>
            {days.map(item => (
              <Form.Check 
                key={item.id}
                type="checkbox"
                label={item.day}
                checked={selectedDays.includes(item.day)}
                onChange={() => toggleDay(item.day)}
              />
            ))}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Временные слоты:</Form.Label>
            {schedules.map(item => (
              <Form.Check 
                key={item.id}
                type="checkbox"
                label={item.timetable}
                checked={selectedTimetables.includes(item.timetable)}
                onChange={() => toggleTimetable(item.timetable)}
              />
            ))}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Группа:</Form.Label>
            <Form.Select
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
            >
              <option value="">Выберите группу</option>
              {groups.groups?.map(group => (
                <option key={group.id} value={group.id}>
                  {group.group_code} {group.speciality} (ID: {group.id})
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Control
            placeholder="Введите название лекции"
            value={lesson}
            onChange={(e) => setLesson(e.target.value)}
            className="mb-3"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Закрыть</Button>
        <Button variant="primary" onClick={handleSubmit}>
          Добавить ({selectedDays.length * selectedTimetables.length} расписаний)
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateSchedule