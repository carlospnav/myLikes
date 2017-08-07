import React, { Component } from 'react'
import { getAll } from './BooksAPI'
import BooksSelect from './BooksSelect'


class Books extends Component{
  constructor(props){
    super(props)

    this.state= {
      shelf: props.shelf,
      shelfName: props.shelfName
    }
  }

  updateShelf(shelfType){
    getAll().then((books) => {
      this.setState( { 
        shelf: books.filter((book) => { return book.shelf === this.state.shelfName }), 
        shelfName: shelfType
      }) 
    })
  }

  componentWillReceiveProps(props){
    this.setState({shelf: props.shelf, shelfName: props.shelfName})
  }

  render(){
    return (
      <ol className="books-grid">
        { (this.state.shelf.length > 0) && (
          this.state.shelf.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ 
                  width: 128, 
                  height: 193, 
                  backgroundImage: `url( ${book.imageLinks.thumbnail} )` 
                  }}>
                </div>
                <div className="book-shelf-changer">
                  <BooksSelect cb={ this.updateShelf } bookItem={book} />
                </div>
              </div>
              <div className="book-title">{book.title}</div>
               <div className="book-authors">{book.authors}</div> 
            </div>
          </li>
        )))}
      </ol> 
    )
  }
}

export default Books