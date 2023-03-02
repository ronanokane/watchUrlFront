import React, {Fragment, useState, useEffect} from 'react' 
import ChangesHistory from './ChangesHistory'

const AddWatcher = ({watchList, setWatchlist})=>{
    const [url, setUrl]= useState("https://keybase.io/ronanokane")
    const [xpath, setXPath] =useState("/html/body/div/div/div[5]/div/div[1]/div/div/div[1]/div/div[4]/a/text()")
    const [cookies, setCookies] = useState("")

    const [listening, setListening] = useState([])

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {url, xpath, cookies}
            const response = await fetch("http://localhost:4000/addWatcher",{
                method:"POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            retrieveWatchers()
        } catch (error) {
            console.error(error.message)
        }
    }

    const removeWatcher= async jobNo=>{
        try {
            const response = await fetch(`http://localhost:4000/removeWatcher/${jobNo}`, {method: "DELETE"})
            retrieveWatchers()
        } catch (error) {
            console.error(error.message)
        }
    }

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

    useEffect(()=>{
        retrieveWatchers()
    },[watchList])

    return (
        <Fragment>           
            <form onSubmit={onSubmitForm}>
                <h5>URL:</h5>
                <input type="text" className="form-control" id="url" value={url} onChange={e => setUrl(e.target.value)}/>
                <h5>XPath:</h5>                
                <input type="text" className="form-control" id="xpath" value={xpath} onChange={e => setXPath(e.target.value)}/>
                <h5>Cookies:</h5>                
                <input type="text" className="form-control" id="cookies" value={cookies} onChange={e => setCookies(e.target.value)}/>                
                <br/>
                <button className="btn btn-success">Add</button> 
            </form>
            <br/>
            <h3>Watchlist:</h3> 
         
            <table className="table table-striped">
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
        </Fragment>
    )
}

export default AddWatcher