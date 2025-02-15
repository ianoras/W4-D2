import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const AddComment = ({ asin }) => {
  const [comment, setComment] = useState({
    comment: '',
    rate: 1,
    elementId: null,
  });

  useEffect(() => {
    setComment((c) => ({
      ...c,
      elementId: asin,
    }));
  }, [asin]);

  const sendComment = async (e) => {
    e.preventDefault();
    // Logica per inviare il commento
  };

  return (
    <Form onSubmit={sendComment}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Inserisci qui il testo" // Assicurati che questo sia corretto
          value={comment.comment}
          onChange={(e) => setComment({ ...comment, comment: e.target.value })}
        />
      </Form.Group>
      <Button type="submit">Invia</Button>
    </Form>
  );
};

export default AddComment;