import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Books from './Books'
import { search } from './BooksAPI'

class SearchBooks extends Component{

  state = {
    query: '',
    showingItems: []
  }

  updateItems = (items) => {
    this.setState({ showingItems: items })
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() }, () =>{
      if (this.state.query) {
        search(this.state.query).then((books) => { 
          this.updateItems(books)
        });
      } else {
        this.updateItems([])
      }
    })
  }


  render(){
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/* 
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input value={ this.state.query } onChange={ event => this.updateQuery(event.target.value) } type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          {( this.state.showingItems.length > 0) && (
            <Books books={ this.state.showingItems }/>
          )}  
        </div>
      </div>
    )
  }
}

export default SearchBooks