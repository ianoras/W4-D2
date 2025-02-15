import { useState, useEffect } from 'react'
import { Form, Button, ListGroup, Row, Col } from 'react-bootstrap'

const CommentArea = ({ asin }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [rating, setRating] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [editingComment, setEditingComment] = useState(null)

  // Token aggiornato
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNzBlNWI3NDcwMTAwMTU4YjJiYWEiLCJpYXQiOjE3Mzk2MTc3MjEsImV4cCI6MTc0MDgyNzMyMX0.9jR5D9rqDYIRsEd92wtw7afe-EmbZVusZ2V_s1Sl-fo"

  useEffect(() => {
    console.log('ASIN ricevuto in CommentArea:', asin) // Debug

    if (asin) {
      setIsLoading(true)
      setError(null)
      
      const url = `https://striveschool-api.herokuapp.com/api/comments/${asin}`
      console.log('Fetching from URL:', url) // Debug
      
      fetch(url, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          console.log('Response status:', response.status) // Debug
          if (!response.ok) {
            if (response.status === 401) {
              throw new Error('Token non valido o scaduto')
            }
            throw new Error(`Errore nella risposta API: ${response.status}`)
          }
          return response.json()
        })
        .then(data => {
          console.log('Commenti ricevuti:', data) // Debug
          setComments(data)
        })
        .catch(error => {
          console.error('Errore dettagliato:', error) // Debug più dettagliato
          setError(error.message)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [asin])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    fetch('https://striveschool-api.herokuapp.com/api/comments/', {
      method: 'POST',
      body: JSON.stringify({
        comment: newComment,
        rate: rating,
        elementId: asin
      }),
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) throw new Error('Errore nell\'invio del commento')
        return response.json()
      })
      .then(() => {
        // Ricarica i commenti e resetta il form
        loadComments()
        setNewComment('')
        setRating(1)
      })
      .catch(error => setError(error.message))
  }

  const handleDelete = (commentId) => {
    fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) throw new Error('Errore nella cancellazione')
        // Ricarica i commenti dopo la cancellazione
        loadComments()
      })
      .catch(error => setError(error.message))
  }

  const handleEdit = (comment) => {
    setEditingComment(comment)
    setNewComment(comment.comment)
    setRating(comment.rate)
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    
    fetch(`https://striveschool-api.herokuapp.com/api/comments/${editingComment._id}`, {
      method: 'PUT',
      body: JSON.stringify({
        comment: newComment,
        rate: rating,
        elementId: asin
      }),
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) throw new Error('Errore nell\'aggiornamento')
        return response.json()
      })
      .then(() => {
        loadComments()
        setNewComment('')
        setRating(1)
        setEditingComment(null)
      })
      .catch(error => setError(error.message))
  }

  const loadComments = () => {
    fetch(`https://striveschool-api.herokuapp.com/api/comments/${asin}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => setError(error.message))
  }

  return (
    <div className="text-center">
      {error && <div className="alert alert-danger">{error}</div>}
      {isLoading ? (
        <div>Caricamento commenti...</div>
      ) : asin ? (
        <>
          <Form onSubmit={editingComment ? handleUpdate : handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="inserisci qui il testo"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label className="d-block fw-bold mb-2">Seleziona un voto: {rating}/5</Form.Label>
              <div className="d-flex justify-content-center align-items-center gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Button
                    key={num}
                    variant={rating >= num ? "warning" : "outline-warning"}
                    onClick={() => setRating(num)}
                    className="px-3"
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </Form.Group>

            <Button type="submit" className="mb-3">
              {editingComment ? 'Aggiorna' : 'Invia'}
            </Button>
            {editingComment && (
              <Button 
                variant="secondary" 
                className="ms-2 mb-3" 
                onClick={() => {
                  setEditingComment(null)
                  setNewComment('')
                  setRating(1)
                }}
              >
                Annulla
              </Button>
            )}
          </Form>
          
          <ListGroup className="mt-3">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <ListGroup.Item key={comment._id} data-testid="single-comment">
                  <Row>
                    <Col>
                      <strong>Commento:</strong> {comment.comment}<br />
                      <strong>Voto:</strong> {comment.rate}/5
                    </Col>
                    <Col xs="auto">
                      <Button 
                        variant="warning" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleEdit(comment)}
                      >
                        Modifica
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => handleDelete(comment._id)}
                      >
                        Elimina
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            ) : (
              <p>Nessun commento presente per questo libro</p>
            )}
          </ListGroup>
        </>
      ) : (
        <p>Seleziona un libro per vedere i commenti</p>
      )}
    </div>
  )
}

export default CommentArea 