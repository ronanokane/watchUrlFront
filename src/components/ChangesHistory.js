import React, {Fragment, useState, useEffect} from 'react' 

const ChangesHistory= ({jobNo}) =>{

    const [changes, setChanges] = useState([])
    const [selectedChange, setSelectedChange] = useState({change: "", date: ""})

    const loggedChanges= async ()=>{
        try {
            const response= await fetch(`http://localhost:4000/loggedChanges/${jobNo}`)
            const changes=await response.json()
            setChanges(changes)
            return changes
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect( ()=>{

        loggedChanges(jobNo).then(changes=>{
            setSelectedChange(changes[0])
        })

        document.addEventListener("newChange", ()=>{
            loggedChanges()
            if (Notification.permission === "granted") 
                new Notification("watchUrl", {body: "Change detected..."});
        }) 
    }, [])

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#modal${jobNo}`}>
            Changes
            </button>

            <div className="modal" id={`modal${jobNo}`}>
            <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">Changes</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div className="modal-body">
                    <button type="button" id="dateDropdown" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                        {selectedChange.date}
                    </button>
                    <ul className="dropdown-menu" style={{maxHeight: "550px", overflow: "auto" }}>
                        {changes.map((change, index)=>(
                            <li onClick={()=>setSelectedChange(change)} key={index}><a className="dropdown-item" href="#">{change.date}</a></li>
                        ))}
                    </ul>
                    <br/>
                    <br/>                                         
                    <p>
                        <textarea value={selectedChange.change} style={{  overflowY: "scroll", resize: "none", width: "100%", height: "240px"}} disabled />
                    </p>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                </div>

                </div>
            </div>
            </div>
        </>
    )
}

export default ChangesHistory