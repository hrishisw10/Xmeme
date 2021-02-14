import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import React, { Component } from 'react'
import MemeList from './components/MemeList'
import MemeForm from './components/MemeForm';

class App extends Component{
  render() {
  return (
    
    <div className="App">
    <h1>Xmeme</h1>
      <MemeForm/>
      <MemeList/>

    </div>
  )
}
}
export default App;
