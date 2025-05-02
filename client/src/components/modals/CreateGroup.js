import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import { useState } from 'react';
import { createGroups } from '../../http/groupsAPI';
function CreateGroup({show,onHide}) {
const [group_code,setGroup_code] = useState('')
const [image,setImage]= useState('')
const [speciality,setSpeciality] = useState('')

const handleSubmit = async() =>{
  try {
    const numericGroupCode = Number(group_code)
    if (isNaN(numericGroupCode)) {
      alert('Код группы должен быть числом!')
      return
    }
    await createGroups(numericGroupCode,speciality,image)
    alert('Группа успешно добавлена')
    onHide()
  } catch (error) {
    alert(error)
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
            Добавить группу
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Control
                placeholder={'Введите код группы '}
                value={group_code}
                onChange={(e)=>setGroup_code(e.target.value)}>
                </Form.Control>
                <Form.Control
                placeholder={'Введите специальность '}
                value={speciality}
                onChange={(e)=>setSpeciality(e.target.value)}>
                </Form.Control>
                <Form.Control
                placeholder={'Добавить изображение URL'}
                value={image}
                onChange={(e)=>setImage(e.target.value)}>
                </Form.Control>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={onHide} className='red_btn'>Закрыть</Button>
        <Button onClick={handleSubmit} className='green_btn' >Добавить</Button>

        </Modal.Footer>
      </Modal>
    );
  }
  
  export default CreateGroup;
  