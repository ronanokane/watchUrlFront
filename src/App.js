import './App.css';
import React, {Fragment, useState} from 'react' 

import AddWatcher from './components/AddWatcher'
import LiveChanges from './components/LiveChanges';
import ListWatchers from './components/ListWatchers';

function App() {
  const [watchList, setWatchlist] = useState([]) 

  const retrieveWatchers=async ()=>{
    try {
        const response = await fetch("http://localhost:4000/listWatchers")
        const watches = await response.json()

        if(JSON.stringify(watchList)!==JSON.stringify(watches))
            setWatchlist(watches)

    } catch (error) {
        console.error(error.message)   
    }
}  

  return (
    <Fragment>
      <div>
      <div className="container p-5 my-5 border">
      <h2>WatchUrl</h2>
      <br></br>      
      <AddWatcher watchList={watchList} refreshWatchers={retrieveWatchers}/>
      <br/>
      <ListWatchers watchList={watchList} refreshWatchers={retrieveWatchers}/>      
      <br/>
      <LiveChanges/>
      </div>
      </div>
    </Fragment>

  );
}

export default App