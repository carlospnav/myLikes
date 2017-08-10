import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { search } from './BooksAPI'
import PropTypes from 'prop-types'
import Shelf from './Shelf'


class UnRouteredSearchBooks extends Component{

  static propTypes = {
    history: PropTypes.object.isRequired
  }


  constructor(props){
    super(props)

    this.state = {
      query: '',
      booksOnDisplay: [],
      history: this.props.history
    }
  }

  updateShelf = (books) => {
    //COMPARE SEARCH RESULTS WITH BOOKCASE ITEMS
    //AND ALLOCATE SHELVES PROPERLY BEFORE SENDING TO <SHELF>!!
    this.setState({ booksOnDisplay: books })
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() }, () =>{
      if (this.state.query) {
        search(this.state.query).then((books) => { 
          this.updateShelf(books)
        });
      } else {
        this.updateShelf([])
      }
    })
  }

  handleBookSelect = () => {
    this.state.history.push('/')
  }

  render(){
    let booksOnDisplay = this.state.booksOnDisplay
    console.log('render ' + booksOnDisplay)
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
          {( this.state.booksOnDisplay.length > 0) && (
            <Shelf cb={this.handleBookSelect} shelfItems={ this.state.booksOnDisplay } searchPage={true}/>
          )}  
        </div>
      </div>
    )
  }
}

const SearchBooks = withRouter(UnRouteredSearchBooks)
export default SearchBooks