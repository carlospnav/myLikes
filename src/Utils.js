import React, { Component } from 'react'

export class BooksInSections {
  reading = []
  wantToRead = []
  read = []
}

export class BooksSelect extends Component{
  state = {
    value: ''
  }

  change(submitSelectCB, event){
    this.setState({value: event.target.value}, () => { submitSelectCB(this.state.value) })
  }

  render(){
    return(
      <select onChange={() => {this.change(this.props.submitSelectCB)}} value={this.state.value}>
        <option value="none" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    )
  }
}

