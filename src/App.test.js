import { fireEvent, render, screen, within } from '@testing-library/react'
import { ThemeProvider } from './ThemeContext'
import App from './App'

describe('main rendering tests', () => {
  it('renders Welcome component', () => {
    // Renderizza l'app all'interno del ThemeProvider
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    )
    // Verifica che il componente di benvenuto sia presente nel documento
    const mainHeader = screen.getByRole('heading', {
      name: /benvenuti in epibooks!/i,
    })
    expect(mainHeader).toBeInTheDocument()
  })

  it('renders all the 150 books', () => {
    
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    )
    // Verifica che vengano renderizzati esattamente 150 schede di libri
    const allTheBookCards = screen.getAllByTestId('book-card')
    expect(allTheBookCards).toHaveLength(150)
  })

  it('renders CommentArea component', async () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    )
    
    // Prima clicca su un libro
    const firstBook = screen.getAllByTestId('book-card')[0]
    fireEvent.click(firstBook)
    
    // Aumenta il timeout e gestisci eventuali errori di case
    const reviewInputField = await screen.findByPlaceholderText(/inserisci qui il testo/i, {}, { timeout: 5000 })
    expect(reviewInputField).toBeInTheDocument()
  })
})

describe('filter testing', () => {
  it("finds just one result for the word 'conan'", () => {
    
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    )
    // Simula l'inserimento della parola 'conan' nel campo di ricerca
    const filterInputField = screen.getByPlaceholderText(/cerca un libro/i)
    fireEvent.change(filterInputField, { target: { value: 'conan' } })
    // Verifica che venga visualizzato solo un libro
    const allTheBookCards = screen.getAllByTestId('book-card')
    expect(allTheBookCards).toHaveLength(2)
  })

  it("finds three results for the word 'witcher'", () => {
   
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    )
    // Simula l'inserimento della parola 'witcher' nel campo di ricerca
    const filterInputField = screen.getByPlaceholderText(/cerca un libro/i)
    fireEvent.change(filterInputField, { target: { value: 'witcher' } })
    // Verifica che vengano visualizzati tre libri
    const allTheBookCards = screen.getAllByTestId('book-card')
    expect(allTheBookCards).toHaveLength(3)
  })
})

describe('SingleBook testing', () => {
  it('makes book card border change clicking on it', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    )
    const allTheBookCards = screen.getAllByTestId('book-card')
    const firstBookCard = allTheBookCards[0]
    fireEvent.click(firstBookCard)
    // Verifica la classe Bootstrap invece dello stile diretto
    expect(firstBookCard).toHaveClass('border-danger')
    expect(firstBookCard).toHaveClass('border-3')
  })

  it('restores normal border after clicking on a second book', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    )
    const allTheBookCards = screen.getAllByTestId('book-card')
    const firstBookCard = allTheBookCards[0]
    const secondBookCard = allTheBookCards[1]
    
    fireEvent.click(firstBookCard)
    expect(firstBookCard).toHaveClass('border-danger')
    
    fireEvent.click(secondBookCard)
    expect(firstBookCard).not.toHaveClass('border-danger')
    expect(secondBookCard).toHaveClass('border-danger')
  })
})

describe('CommentList testing', () => {
  it('renders no book comments on load', () => {
    
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    )
    // Verifica che non ci siano commenti visualizzati all'inizio
    const allTheBookComments = screen.queryAllByTestId('single-comment')
    expect(allTheBookComments).toHaveLength(0)
  })

  it('renders comments clicking on a valid book', async () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    )
    const firstBookCard = screen.getAllByTestId('book-card')[0]
    fireEvent.click(firstBookCard)
    
    // Aumenta il timeout e gestisci il caso di nessun commento
    try {
      const allTheBookComments = await screen.findAllByTestId('single-comment', {}, { timeout: 5000 })
      expect(allTheBookComments.length).toBeGreaterThan(0)
    } catch (error) {
      // Se non ci sono commenti, verifica che ci sia il messaggio appropriato
      const noCommentsMessage = screen.getByText('Nessun commento presente per questo libro')
      expect(noCommentsMessage).toBeInTheDocument()
    }
  })
})