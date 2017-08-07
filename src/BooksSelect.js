import React, { Component } from 'react'
import { update } from './BooksAPI'

class BooksSelect extends Component{

  constructor(props){
    super(props)

    this.state= {
      shelf: this.props.bookItem.shelf,
      cb: this.props.cb
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    const shelf = event.target.value
    this.setState({shelf: shelf})
    update(this.props.bookItem, shelf).then(
      () => {
        this.setState({shelf: shelf})
        this.state.cb(shelf)
      }
    ).catch((e) => {
      console.log('An error has occured: ' + e)
    })
  }

  render(){
    return(
      <select onChange={ (event) => (this.handleChange(event)) } value={ this.state.shelf } >
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