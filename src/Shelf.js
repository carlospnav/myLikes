import React from 'react'
import { update } from './BooksAPI'
import Book from './Book'

/*Shelf receives the books to render as props, along with a callback 
from its parent to trigger the re-render of the whole tree of components 
when the shelf changes. 
*/

const Shelf = ({shelfItems, cb}) => {

    /* Uses the BookAPI to update the back-end with the book's
  new shelf and calls the bookcase to update itself. 
  */
  const handleShelfUpdate = (book, shelf) => {
    update(book, shelf).then(
      () => {
        cb()
      }
    )
  }

  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        { (shelfItems.length > 0) && (
          shelfItems.map((book) => (
            <li key={book.id}>
              <Book book={ book } cb={ handleShelfUpdate }/>
            </li>
        )))}
      </ol> 
    </div>
  )
}

export default Shelf