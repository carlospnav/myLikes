import React, { Component } from 'react'

/* Select component receives the shelf name as props
and the callback from the shelf to update itself. 
*/
class BooksSelect extends Component{

  constructor(props){
    super(props)

    this.state= {
      shelf: this.props.shelf,
      cb: this.props.cb
    }
  }

  /* Once the Book re-renders, it sends down the shelf name
  as prop and this will update the state with it. 
  */
  componentWillReceiveProps(props){
    this.setState({shelf: props.shelf})
  }


  /* Once the user selects an option, onChange event triggers this
  handler, which calls the Book's callback to update the itself 
  */
  handleChange = (event) => {
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