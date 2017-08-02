import React, { Component } from 'react'
import { update } from './BooksAPI'

class BooksSelect extends Component{
  state = {
    value: ''
  }

  change(event){
    this.setState({ value: event.target.value }, () => {
      update(this.props.bookItem, this.state.value)
    })
  }

  render(){
    return(
      <select onChange={ (event) => (this.change(event)) } value={ this.state.value }>
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