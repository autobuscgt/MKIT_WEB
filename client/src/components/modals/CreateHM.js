import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap'
import {Form,Dropdown} from 'react-bootstrap'
import { useState } from 'react'
import { createHomework } from '../../http/homeworkAPI'
import { useContext } from 'react'
import { Context } from '../..'
function CreateHM({show,onHide}) {

  const [lesson,setLesson] = useState('')
  const [description,setDescription] = useState('')
  const [groupId,setGroupId] = useState('')
  const {groups} = useContext(Context)
  const selectedGroup = groups.groups?.find(g => g.id === Number(groupId))
  const handleSubmit = async()=>{
    try {
      await createHomework(
        lesson,
        description,
        Number(groupId)
      )
      alert('Домашнее задание успешно создано')
    } catch (error) {
      alert(error)
    }
  }
    return (
        <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Добавить домашнее задание
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control
                placeholder={'Введите название предмета '}
                value={lesson}
                onChange={(e)=>setLesson(e.target.value)}>
                </Form.Control>
                <Form.Control
                placeholder={'Введите описание'}
                value={description}
                onChange={(e)=>setDescription(e.target.value)}>
                </Form.Control>
                <Form.Control
                type="number"
                placeholder={'Введите ID группы'}
                value={groupId}
                onChange={(e)=>setGroupId(e.target.value)}>
                </Form.Control>
                <Dropdown className='dropdown mb-3'>
            <Dropdown.Toggle variant="secondary">
              {selectedGroup?.name || 'Выберите группу'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {groups.groups?.map((group) => (
                <Dropdown.Item 
                  key={group.id}
                  onClick={() => setGroupId(group.id.toString())}
                >
                  {group.group_code} {group.speciality} (ID: {group.id})
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} className='red_btn'>Закрыть</Button>
          <Button onClick={handleSubmit} className='green_btn'>Добавить</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  export default CreateHM;
  