import { Card } from 'react-bootstrap'

const SingleBook = ({ book }) => {
  return (
    <Card className="mb-3 bg-light text-dark" data-testid="book-card">
      <Card.Img variant="top" src={book.img} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>
          <strong>Prezzo:</strong> {book.price} €
        </Card.Text>
        <Card.Text>
          <strong>Categoria:</strong> {book.category}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default SingleBook 