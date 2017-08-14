import React from 'react'
import BooksSelect from './BooksSelect'

/* Book receives a book as prop from the shelf
along with a callback to let shelf update itself. 
*/
const Book = ({book, cb}) => {

  /* Sends a book and the shelf selected by the user
   to the shelf callback, so that it updates itself with
   the new book 
   */
  const handleUpdate = (shelf) => {
    cb(book, shelf)
  }

  return(
    <div className="book">
      <div className="book-top">
          <div className="book-cover" style={{ 
          width: 128, 
          height: 193, 
          backgroundImage: `url( ${book.imageLinks.thumbnail} )` 
          }}>
        </div> 
          <div className="book-shelf-changer">
          <BooksSelect cb={ handleUpdate } shelf={book.shelf} />
        </div> 
      </div>
      <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors && book.authors.join(", ")}</div> 
    </div> 
  )
}

export default Book