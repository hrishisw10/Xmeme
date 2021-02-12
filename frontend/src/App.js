import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import MemeList from './components/MemeList'

function App() {

  const [memes, setMemes] = useState([])

  useEffect(() => {
    const fetchMemes = async () => {
      const res = await axios.get(`/memes`)
      console.log(res.data)
      setMemes(res.data)
    }
    fetchMemes()
  }, [])
  
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <MemeList memes={memes}/>

    </div>
  );
}

export default App;
