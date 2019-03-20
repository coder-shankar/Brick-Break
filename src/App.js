import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './canvas.css'
import Canvas from './Game'


class App extends Component {

  render() {
    return (
      <div className="App">
       <Canvas />
      </div>
    );
  }
}

export default App;
