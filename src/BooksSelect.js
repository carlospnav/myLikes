import React from 'react'

/* Select component receives the shelf name as props
and the callback from the shelf to update itself. 
*/
const BooksSelect = ({shelf, cb}) => {

  /* Once the user selects an option, onChange event triggers this
  handler, which calls the Book's callback to update the itself 
  */
  const handleChange = (event) => {
    const shelfName = event.currentTarget.value
    cb(shelfName)
  }

  return(
    <select onChange={ (event) => (handleChange(event)) } value={ shelf } >
      <option value="none" disabled>Move to...</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  )
}

export default BooksSelect