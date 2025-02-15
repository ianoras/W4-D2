import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'

const SingleBook = ({ setSelected, selected, book }) => {
  const navigate = useNavigate()
  const { theme } = useContext(ThemeContext)

  return (
    <>
      <Card
        onClick={() => setSelected(book.asin)}
        style={{
          border: selected === book.asin ? '3px solid red' : 'none',
        }}
        data-testid="book-card"
        className={`mb-3 bg-${theme} text-${theme === 'light' ? 'dark' : 'light'}`}
      >
        <Card.Img variant="top" src={book.img} />
        <Card.Body>
          <Card.Title className={theme === 'dark' ? 'text-white' : ''}>{book.title}</Card.Title>
          <Card.Text>
            <strong>Prezzo:</strong> <span className={theme === 'dark' ? 'text-white' : ''}>{book.price} €</span>
          </Card.Text>
          <Button
            className="w-100 mt-2"
            onClick={() => navigate(`/details/${book.asin}`)}
          >
            VAI AI DETTAGLI
          </Button>
        </Card.Body>
      </Card>
    </>
  )
}

export default SingleBook
