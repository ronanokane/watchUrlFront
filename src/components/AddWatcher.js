import React, {Fragment, useState, useEffect} from 'react' 

const AddWatcher = ({watchList, setWatchlist})=>{
    const [url, setUrl]= useState("https://keybase.io/ronanokane")
    const [xpath, setXPath] =useState("/html/body/div/div/div[5]/div/div[1]/div/div/div[1]/div/div[3]/text()")
    const [cookies, setCookies] = useState("")
   
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {url, xpath, cookies}
            await fetch("http://localhost:4000/addWatcher",{
                method:"POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            await refreshWatchers()
        } catch (error) {
            alert('Is batchWatchUrl loaded ?')           
        }
    }
    async function refreshWatchers() {
        try {
            const response = await fetch("http://localhost:4000/listWatchers")
            const watches = await response.json()
    
            if (JSON.stringify(watchList) !== JSON.stringify(watches))
                setWatchlist(watches)            
            
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(()=>{
        refreshWatchers()
    },[watchList])

    return (
        <>        
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
        </>
    )
}

export default AddWatcher