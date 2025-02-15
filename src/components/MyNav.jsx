import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'

const MyNav = ({ searchQuery, setSearchQuery }) => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <Navbar
      expand="lg"
      className={`mb-3 ${theme === 'light' ? 'bg-light' : 'bg-dark'}`}
      variant={theme === 'light' ? 'light' : 'dark'}
    >
      <Container fluid>
        <Link to="/">
          <Navbar.Brand>EpiBooks</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/">
              <div className="nav-link">Home</div>
            </Link>
            <Link to="/about">
              <div className="nav-link">About</div>
            </Link>
            <Link to="/browse">
              <div className="nav-link">Browse</div>
            </Link>
          </Nav>
          <Nav className="ms-auto">
            <Form.Group>
              <Form.Control
                type="search"
                placeholder="Cerca un libro"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Group>
            <Button onClick={toggleTheme} className="ms-2">
              {theme === 'light' ? 'Passa a Dark' : 'Passa a Light'}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNav
