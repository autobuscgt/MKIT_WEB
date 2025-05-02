import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import { useState } from 'react';
import { createEvents } from '../../http/eventsAPI';
function CreateEvents({show,onHide}) {
const [name,setName] = useState('')
const [image,setImage] = useState('')
const [description, setDescription] = useState('')
const [day_of_week,setDay_of_week] = useState('')

const handleSubmit = async()=>{
      try {
        await createEvents(name,image,description,day_of_week)
        alert('Мероприятие успешно добавлено')
      } catch (error) {
        console.error(error)
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
            Добавить мероприятие
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control
                placeholder={'Введите наименование мероприятия'}
                value={name}
                onChange={(e)=>setName(e.target.value)}
                >
                </Form.Control>
                <Form.Control
                placeholder={'Введите URL изображения'}
                value={image}
                onChange={(e)=>setImage(e.target.value)}
                >
                </Form.Control>
                <Form.Control
                placeholder={'Введите Описание'}
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                >
                </Form.Control>
                <Form.Control
                  type="date"
                  name="day_of_week"
                  value={day_of_week}
                  onChange={(e)=>setDay_of_week(e.target.value)}
                />
               
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={onHide} className='red_btn'>Закрыть</Button>
        <Button onClick={handleSubmit} className='green_btn'>Добавить</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  export default CreateEvents;
  