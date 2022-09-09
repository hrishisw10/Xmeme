import './App.css';
import React, { Component } from 'react'
import MemeList from './components/MemeList'
import MemeForm from './components/MemeForm';
class App extends Component{
  render() {
  return (
    
    <div className="App">
    
      <div className="App-header">
        <h1><span id="x">X</span><span id="m">m</span><span id="e">e</span><span id="m">m</span><span id="e">e</span></h1>
        <MemeForm/>
      </div>
      <div className="App-body">
        <MemeList/>
      </div>
    </div>
  )
}
}
export default App;
