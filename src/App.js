import './App.css';
import React, {Fragment} from 'react' 

import AddWatcher from './components/AddWatcher'
import LiveChanges from './components/LiveChanges';

function App() {
  return (
    <Fragment>
      <div>
      <div class="container p-5 my-5 border">
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