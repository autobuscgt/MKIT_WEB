import Modal from 'react-bootstrap/Modal'
import {Form} from 'react-bootstrap'
import {observer} from 'mobx-react-lite'
import {deleteAllSchedule} from '../../../http/scheduleAPI';
const DeleteSchedule = observer(({ show, onHide }) => {


  const handleSubmit = async () => {
    try {
      await deleteAllSchedule();
      alert('Все расписание было удалено')
      onHide();
    } catch (e) {
      console.error('Update error:', e);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Удаление расписания</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            Вы точно хотите удалить <i><b style={{color:'red'}}>всё</b></i> расписание?
        </Form>

      </Modal.Body>
      <Modal.Footer>
        <button className='red_btn' onClick={handleSubmit}>
          Удалить
        </button>
        <button className='green_btn' onClick={onHide}>
          Закрыть
        </button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteSchedule;
  