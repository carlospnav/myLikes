import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Books from './Books'
import { getAll } from "./BooksAPI"

class ListBooks extends Component{
  state = {
    reading: [],
    wantToRead: [],
    read: []
  }

  componentWillMount() {
    const booksToUpdate = { 
      reading: [],
      wantToRead: [],
      read: []
    }
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
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  <Books books={ this.state.reading } />
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  <Books books={ this.state.wantToRead }/>
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">                
                  <Books books={ this.state.read }/>  
                </ol>
              </div>
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

export default ListBooks