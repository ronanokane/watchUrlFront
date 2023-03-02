import React, {Fragment, useState, useEffect} from 'react' 

const ChangesHistory= ({jobNo}) =>{

    const [changes, setChanges] = useState([])

    const loggedChanges= async (jobNo)=>{
        try {
            const response= await fetch(`http://localhost:4000/loggedChanges/${jobNo}`)
           // console.log(jobNo)
            setChanges(await response.json())
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect( ()=>{
        loggedChanges(jobNo)
    }, [])



    return (
        <Fragment>
           {/*  className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#modal${jobNo}`}  */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#modal${jobNo}`}>
            View Changes
            </button>

            <div className="modal" id={`modal${jobNo}`}>
            <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">Changes</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div className="modal-body">
                {changes.map((change)=>(
                        <p>
                        <p>{change.date}</p>{change.change}
                        </p>
                    )
                )}
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                </div>

                </div>
            </div>
            </div>
        </Fragment>
    )
}

export default ChangesHistory