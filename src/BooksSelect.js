import React, { Component } from 'react'
import { update } from './BooksAPI'

class BooksSelect extends Component{

  change(event, cb){
    const value = event.target.value
    update(this.props.bookItem, value).then(
      () => {
        cb(value)
      }
    )
  }

  render(){
    return(
      <select onChange={ (event) => (this.change(event, this.props.cb)) } >
        <option value="none" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    )
  }
}

export default BooksSelect