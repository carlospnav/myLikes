import React, { Component } from 'react'
import BooksSelect from './BooksSelect'


/* Book receives a book as prop from the shelf
along with a callback to let shelf update itself. 
*/
class Book extends Component{

  constructor(props){
    super(props)

    this.state = {
      book: this.props.book,
      cb: props.cb
    }
  }

  /* Sends a book and the shelf selected by the user
  to the shelf callback, so that it updates itself with
  the new book 
  */
  handleUpdate = (shelf) => {
    this.state.cb(this.state.book, shelf)
  }

  componentWillReceiveProps(props){
    this.setState({book: props.book})
  } 

  render(){
    const book = this.state.book;
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
            <BooksSelect cb={ this.handleUpdate } shelf={book.shelf} />
          </div> 
        </div>
        <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div> 
      </div> 
    )
  }
}

export default Book