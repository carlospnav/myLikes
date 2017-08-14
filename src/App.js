import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import Bookcase from './Bookcase'
import './App.css'


const BooksApp = () => {
  return (
    <div className="app">
      <Route exact path="/" render={() => (
        <Bookcase
        />
      )}/>
      <Route path="/search" render={() => (
        <SearchBooks
        />
      )}/>
    </div>
  )
}

export default BooksApp
