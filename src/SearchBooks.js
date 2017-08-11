import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { search, getAll } from './BooksAPI'
import PropTypes from 'prop-types'
import Shelf from './Shelf'

/* Search component unattached to router from react-router. It gets
access to the history via props once it's passed to the withRouter
component down the file.  
*/
class UnRouteredSearchBooks extends Component{

  static propTypes = {
    history: PropTypes.object.isRequired
  }


  constructor(props){
    super(props)

    this.state = {
      query: '',
      booksOnDisplay: [],
      bookIdsToCompare: [],
      history: this.props.history
    }
  }

  /* Once the component is mounted, it retrieves the bookcase 
  and pushes every book id to a new array which gets added to 
  the component's state. 
  */
  componentDidMount(){
    const bookIdsToCompare = []
    getAll().then((books) => {
      books.forEach((book) => {
        bookIdsToCompare.push(book.id)
      })
      this.setState({bookIdsToCompare: bookIdsToCompare})
    })
  }

  /* Compares each book id in the received book array, with the
  id of the books in the bookcase, if they don't match, they aren't yet
  sorted, and then it adds them to the shelf to be displayed in the search page,
  properly initializing their shelf property to reflect that they are not yet sorted. 
  */
  updateShelf = (books) => {
    const filteredBooks = []
    books.forEach((book) => {
      if (!this.state.bookIdsToCompare.includes(book.id)) {

        book.shelf = 'none'
        filteredBooks.push(book)
      }
    })
    this.setState({ booksOnDisplay: filteredBooks })
  }

  /* Update the controlled form by setting the query state and then
  searches the database with this query. If any books are found, calls
  the handler to sort the books and update the shelf with them. 
  */
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

  /* Returns to the main page using the history prop from the withRouter component.
  This callback is triggered by the shelf component.
  */
  handleBookSelect = () => {
    this.state.history.push('/')
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
          {( this.state.booksOnDisplay.length > 0) && (
            <Shelf cb={this.handleBookSelect} shelfItems={ this.state.booksOnDisplay } searchPage={true}/>
          )}  
        </div>
      </div>
    )
  }
}

/* Connects the component with a Router that gives access to the history prop 
which allows the search page to return to the main page programatically. 
*/
const SearchBooks = withRouter(UnRouteredSearchBooks)
export default SearchBooks