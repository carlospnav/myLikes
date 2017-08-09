import React, { Component } from 'react'

class BooksSelect extends Component{

  constructor(props){
    super(props)

    this.state= {
      shelf: this.props.shelf,
      cb: this.props.cb
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(props){
    this.setState({shelf: props.shelf})
  }

  handleChange(event){
    const shelf = event.currentTarget.value
    this.state.cb(shelf)
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