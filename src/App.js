import './App.css';
import React, {Fragment, useState} from 'react' 

import AddWatcher from './components/AddWatcher'
import LiveChanges from './components/LiveChanges';

function App() {
  return (
    <Fragment>
      <div>
      <div className="container p-5 my-5 border">
      <h2>WatchUrl</h2>
      <br></br>      
      <AddWatcher/>
      <br/>
      <LiveChanges/>
      </div>
      </div>
    </Fragment>

  );
}

export default App