import { Card, Col, Row, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import CommentArea from './CommentArea'
import fantasy from '../data/fantasy.json'
import { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'

const BookDetails = () => {
  const params = useParams()
  const navigate = useNavigate()
  const foundBook = fantasy.find((book) => book.asin === params.asin)
  const { theme } = useContext(ThemeContext)

  return (
    <Row className="justify-content-center">
      <Col md={4} className="mb-4">
        <Card className={`bg-${theme} text-${theme === 'light' ? 'dark' : 'light'}`}>
          <Card.Img 
            variant="top" 
            src={foundBook.img} 
            style={{ maxHeight: '400px', width: '100%', objectFit: 'contain' }} 
          />
          <Card.Body>
            <Card.Title className={theme === 'dark' ? 'text-white' : ''}>{foundBook.title}</Card.Title>
            <Card.Text>
              <strong>Prezzo:</strong> {foundBook.price} €
            </Card.Text>
            <Card.Text>
              <strong>Descrizione:</strong> {foundBook.description}
            </Card.Text>
            <Card.Text>
              <strong>Categoria:</strong> {foundBook.category}
            </Card.Text>
            <Card.Text>
              <strong>ASIN:</strong> {foundBook.asin}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6} className="mb-4">
        <CommentArea asin={params.asin} />
      </Col>
      <Col md={12} className="text-center mt-3">
        <Button variant="primary" onClick={() => navigate('/')}>
          Torna alla Home
        </Button>
      </Col>
    </Row>
  )
}

export default BookDetails
