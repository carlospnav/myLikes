import React, { Component } from 'react'
import { update } from './BooksAPI'
import Book from './Book'

/*Shelf receives the books to render as props, along with
whether it should update on next render, a callback from its parent
to trigger the re-render of the whole tree of components when the shelf
changes and a flag that determines if the shelf is on the search page or 
the main page. 
*/
class Shelf extends Component{
  constructor(props){
    super(props)

    this.state= {
      shelfItems: props.shelfItems,
      update: false,
      cb: props.cb,
      searchPage: (props.searchPage) ? props.searchPage : false
    }
  }

  /* Uses the BookAPI to update the back-end with the book's
  new shelf, flags this shelf for updates and calls the bookcase
  to update itself. It won't try to update if the shelf is on the
  search page since it will get redirected to main page anyway. 
  */
  handleShelfUpdate = (book, shelf) => {
    update(book, shelf).then(
      () => {
        (this.state.searchPage) || (
          this.setState({ update: true })
        )
        this.state.cb()
      })
  }

  /* Once bookcase is updated, new props come in and this component gets re-rendered 
  with a new state 
  */
  componentWillReceiveProps(props){
    if(update)
      this.setState({ shelfItems: props.shelfItems, update: false })
  }

  render(){
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          { (this.state.shelfItems.length > 0) && (
            this.state.shelfItems.map((book) => (
              <li key={book.id}>
                <Book book={ book } cb={ this.handleShelfUpdate }/>
              </li>
          )))}
        </ol> 
      </div>
    )
  }
}

export default Shelf