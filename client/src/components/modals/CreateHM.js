import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import { useState } from 'react'
import { createHomework } from '../../http/homeworkAPI'
function CreateHM({show,onHide}) {

  const [lesson,setLesson] = useState('')
  const [description,setDescription] = useState('')
  const [groupId,setGroupId] = useState('')

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
  