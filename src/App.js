import React, { Component } from 'react';
import './App.css';
import Poll from './compnents/ui/Poll'


class App extends Component {
render() {  
    return (
      <div className="App">
        <header className="App-header">
          <h2>Vote for winner... chose your option.</h2>
        </header>
        <Poll/>
        <p className="shortcuts">KeyBoard ShortCuts : -A Wins: <kbd>A/a</kbd>- B Wins: <kbd>B/b</kbd>-Draw <kbd>D/d</kbd>-Vote (send)<kbd>Enter</kbd>.</p>
      </div>
    );
  }
}

export default App;
