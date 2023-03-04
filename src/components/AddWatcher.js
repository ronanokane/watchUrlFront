import React, {Fragment, useState, useEffect} from 'react' 
import ListWatchers from './ListWatchers'

const AddWatcher = ()=>{
    const [url, setUrl]= useState("https://keybase.io/ronanokane")
    const [xpath, setXPath] =useState("/html/body/div/div/div[5]/div/div[1]/div/div/div[1]/div/div[3]/text()")
    const [cookies, setCookies] = useState("")
    const [watchList, setWatchlist] = useState([])    

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {url, xpath, cookies}
            let response = await fetch("http://localhost:4000/addWatcher",{
                method:"POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
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

            <ListWatchers watchList={watchList} refreshWatchers={retrieveWatchers}/>
        </Fragment>
    )
}

export default AddWatcher