import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MyNav from './components/MyNav'
import MyFooter from './components/MyFooter'
import Welcome from './components/Welcome'
import AllTheBooks from './components/AllTheBooks'
import { Container } from 'react-bootstrap'
import { useState, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from './components/NotFound'
import BookDetails from './components/BookDetails'
import { ThemeContext } from './ThemeContext'
import CommentArea from './components/CommentArea'

function App() {
  const { theme } = useContext(ThemeContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBook, setSelectedBook] = useState(null)

  return (
    <div className={`min-vh-100 ${theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light'}`}>
      <BrowserRouter>
        <MyNav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Container>
          <Welcome />
          <div className="row">
            {/* Colonna sinistra - Lista dei libri */}
            <div className="col-md-8">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <AllTheBooks 
                      searchQuery={searchQuery} 
                      selectedBook={selectedBook}
                      setSelectedBook={setSelectedBook}
                    />
                  } 
                />
                <Route path="/details/:asin" element={<BookDetails />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            
            {/* Colonna destra - Area commenti */}
            <div className="col-md-4">
              <div className="sticky-top pt-3">
                <CommentArea asin={selectedBook} />
              </div>
            </div>
          </div>
        </Container>
        <MyFooter />
      </BrowserRouter>
    </div>
  )
}

export default App
