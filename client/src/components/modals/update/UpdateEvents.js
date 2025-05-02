import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import { useState } from 'react';
import { useContext } from 'react';
import { Context } from '../../..';
import { useEffect } from 'react';
import {observer} from 'mobx-react-lite'
const UpdateEvents = observer(({ show, onHide, eventId }) => {
  const { event } = useContext(Context);
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    description: '',
    day_of_week: ''
  });

  useEffect(() => {
    if (eventId && event.events) {
      const currentEvent = event.events.find(e => e.id === eventId);
      if (currentEvent) {
        setFormData({
          image: currentEvent.image || '',
          name: currentEvent.name || '',
          description: currentEvent.description || '',
          day_of_week: currentEvent.day_of_week || ''
        });
      }
    }
  }, [eventId, event.events]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await event.updateEvent(eventId, formData);
      onHide();
    } catch (e) {
      console.error('Update error:', e);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Обновление мероприятия</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>URL изображения</Form.Label>
            <Form.Control
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Введите URL изображения"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Название</Form.Label>
            <Form.Control
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Введите название"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Введите описание"
              rows={3}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Дата</Form.Label>
            <Form.Control
              type="date"
              name="day_of_week"
              value={formData.day_of_week}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Обновить
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default UpdateEvents;
  