import React, { Component } from 'react';
import './App.css';
import RedditList from './RedditList/RedditList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <RedditList>
            
          </RedditList>
        </header>
      </div>
    );
  }
}

export default App;
