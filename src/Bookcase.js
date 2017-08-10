import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BooksInSections } from './Utils'
import { getAll } from "./BooksAPI"
import Shelf from './Shelf'



class Bookcase extends Component{
  constructor(props){
    super(props)

    this.state = {
      read: [],
      reading: [],
      wantToRead: [],
      updateBookCase: this.updateBookCase.bind(this),
      getSortedBookcase: this.getSortedBookcase.bind(this)
    }
  }

  componentDidMount() {
    this.state.getSortedBookcase()
  }

  updateBookCase(){
    this.state.getSortedBookcase()
  }

  getSortedBookcase(){
    const booksToUpdate = new BooksInSections() 
    getAll().then((books) => {
      books.forEach((book) => {
        switch(book.shelf){
          case 'currentlyReading':
            booksToUpdate.reading.push(book)
            break;
          case 'wantToRead':
            booksToUpdate.wantToRead.push(book)
            break;
          case 'read':
            booksToUpdate.read.push(book)
            break;
          default:
            console.log('Book not sorted.')
        }
      })
      this.setState(booksToUpdate)
    })
  }

  render(){
    const {read, reading, wantToRead} = this.state
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              {(reading.length > 0) && (
                <Shelf shelfItems={ reading } cb={this.state.updateBookCase} />
              )}
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              {(wantToRead.length > 0) && (
                <Shelf shelfItems={ wantToRead } cb={this.state.updateBookCase} />
              )}
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              {(read.length > 0) && (
                <Shelf shelfItems={ read } cb={this.state.updateBookCase} />
              )}                
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Bookcase