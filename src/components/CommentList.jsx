import { ListGroup } from 'react-bootstrap'
import { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import SingleComment from './SingleComment'

const CommentList = ({ commentsToShow }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <ListGroup className={`mt-3 bg-${theme} text-${theme === 'light' ? 'dark' : 'light'}`}>
      {commentsToShow.map((comment) => (
        <SingleComment key={comment._id} comment={comment} />
      ))}
    </ListGroup>
  )
}

export default CommentList
