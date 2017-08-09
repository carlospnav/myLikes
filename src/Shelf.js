import React, { Component } from 'react'
import { update } from './BooksAPI'
import Book from './Book'


class Shelf extends Component{
  constructor(props){
    super(props)

    this.state= {
      shelfItems: props.shelfItems,
      update: false,
      cb: props.cb,
      handleShelfUpdate: this.handleShelfUpdate.bind(this)
    }
  }

  handleShelfUpdate(book, shelf){
    update(book, shelf).then(
      () => {
        this.setState({ update: true })
        this.state.cb()
      })
  }

  componentWillReceiveProps(props){
    if(update)
      this.setState({ shelfItems: props.shelfItems, update: false })
  }

  render(){
    return (
      <ol className="books-grid">
        { (this.state.shelfItems.length > 0) && (
          this.state.shelfItems.map((book) => (
            <li key={book.id}>
              <Book book={ book } cb={ this.state.handleShelfUpdate }/>
            </li>
        )))}
      </ol> 
    )
  }
}

export default Shelf