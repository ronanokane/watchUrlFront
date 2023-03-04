import React, {Fragment, useState, useEffect} from 'react' 

const ChangesHistory= ({jobNo}) =>{

    const [changes, setChanges] = useState([])
    const [selectedChange, setSelectedChange] = useState("")

    const loggedChanges= async ()=>{
        try {
            const response= await fetch(`http://localhost:4000/loggedChanges/${jobNo}`)
            setChanges(await response.json())
            setSelectedChange(changes[0].change)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect( ()=>{
        loggedChanges(jobNo)
        document.addEventListener("newChange", loggedChanges)        
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
                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" style={{marginRight: "10px"}}>
                        Date
                    </button>
                    <ul className="dropdown-menu">
                        {changes.map((change, index)=>(
                            <>
                                <li onClick={()=>setSelectedChange(change)}><a className="dropdown-item" href="#" key={index}>{change.date}</a></li>
                            </>
                        ))}
                    </ul>

                        {selectedChange.date} 
                    <br/>
                    <br/>                                         
                    <p>
                        {selectedChange.change}                    
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