import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import fantasy from '../data/fantasy.json'

const AllTheBooks = ({ searchQuery, selectedBook, setSelectedBook }) => {
  console.log('Selected book:', selectedBook) // Debug

  const handleBookClick = (asin) => {
    console.log('Clicking book with ASIN:', asin) // Debug
    setSelectedBook(asin)
  }

  return (
    <Row className="g-2 mt-3">
      {fantasy
        .filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(book => (
          <Col xs={12} md={4} key={book.asin}>
            <Card 
              className={`mb-3 ${selectedBook === book.asin ? 'border-danger border-3' : ''}`}
              onClick={() => handleBookClick(book.asin)}
              data-testid="book-card"
            >
              <Card.Img variant="top" src={book.img} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                  <strong>Prezzo:</strong> {book.price} €
                </Card.Text>
                <Card.Text>
                  <strong>Categoria:</strong> {book.category}
                </Card.Text>
                <Card.Text>
                  <strong>ASIN:</strong> {book.asin}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
    </Row>
  )
}

export default AllTheBooks 