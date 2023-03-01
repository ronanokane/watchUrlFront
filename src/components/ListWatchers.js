import React, {Fragment, useState, useEffect} from 'react' 
import ChangesHistory from './ChangesHistory'

const ListWatchers=()=>{

    const [watchList, setWatchlist] = useState([])

    const removeWatcher= async jobNo=>{
        try {
            const response = await fetch(`http://localhost:4000/removeWatcher/${jobNo}`, {method: "DELETE"})

            retrieveWatchers()
           // setWatchlist(retrieveWatchers())
        } catch (error) {
            console.error(error.message)
        }
    }

    const retrieveWatchers=async ()=>{
        try {
            const response = await fetch("http://localhost:4000/listWatchers")
            const watches = await response.json()
    
            setWatchlist(watches)

        } catch (error) {
            console.error(error.message)   
        }
    }

    useEffect(()=>{
        retrieveWatchers()
    }, [])

   // retrieveWatchers()

    return (
        <Fragment>
            <div class="container mt3">
            <h3>Urls being watched</h3>           
            <table class="table">
                <thead>
                <tr>
                    <th>JobNo</th>
                    <th>Url</th>
                    <th>XPath</th>
                    <th></th>    
                    <th></th>                                      
                </tr>
                </thead>
                <tbody>

                {watchList.map((item, index)=>(
                <tr key={item.jobNo}>
                    <td>{item.jobNo}</td>
                    <td>{item.url}</td>
                    <td>{item.xpath}</td>
                    <td><ChangesHistory jobNo={item.jobNo}/></td>                  
                    <td><button onClick={()=> removeWatcher(item.jobNo)} className="btn btn-danger">Remove</button></td>
                </tr>
                ))}
                </tbody>
            </table>
            </div>
        </Fragment>
    )
}

export default ListWatchers