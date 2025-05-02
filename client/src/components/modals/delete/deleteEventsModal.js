import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap'

function DeleteEvents({show,onHide,onConfirm}) {

    return (
        <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Удалить мероприятие
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Вы точно хотите удалить мероприятие?
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={onConfirm} className='red_btn'>Удалить</Button>
        <Button onClick={onHide} className='green_btn'>Закрыть</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  export default DeleteEvents;
  