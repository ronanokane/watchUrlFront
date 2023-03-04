import React, { useState, useEffect } from "react"

const LiveChanges= ()=>{
    const [changes, setChanges]= useState([])

    useEffect( () => {
          const events = new EventSource('http://localhost:4000/changes');
          const newChange = new Event("newChange");
    
          events.onmessage = (event) => {
              const parsedData = JSON.parse(event.data);

              setChanges((changes)=>changes.concat(parsedData));
              document.dispatchEvent(newChange)     
          };
          
    }, []);
    
    return (
        <>
        <h3>Live changes</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Url</th>
              <th>Change</th>              
            </tr>
          </thead>
          <tbody>
            {
              changes.map((change, i) =>
                <tr key={i}>
                  <td>{change.date}</td>                    
                  <td>{change.url}</td>
                  <td>{change.change}</td>
                </tr>
              )
            }
          </tbody>
        </table>
        </>
    );    
}

export default LiveChanges