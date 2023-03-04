import './App.css';
import React, {Fragment, useState} from 'react' 

import AddWatcher from './components/AddWatcher'
import LiveChanges from './components/LiveChanges';
import ListWatchers from './components/ListWatchers';

function App() {
  const [watchList, setWatchlist] = useState([]) 

  return (
    <Fragment>
      <div>
      <div className="container p-5 my-5 border">
      <h2>WatchUrl</h2>
      <br></br>      
      <AddWatcher watchList={watchList} setWatchlist={setWatchlist}/>
      <br/>
      <ListWatchers watchList={watchList} setWatchlist={setWatchlist}/>      
      <br/>
      <LiveChanges/>
      </div>
      </div>
    </Fragment>

  );
}

export default App