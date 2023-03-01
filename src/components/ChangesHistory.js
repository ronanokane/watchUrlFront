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
    },[])

    return (
        <Fragment>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#modal${jobNo}`}>
            View Changes
            </button>

            <div class="modal" id={`modal${jobNo}`}>
            <div class="modal-dialog">
                <div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title">Changes</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body">
                {changes.map((change)=>(
                        <p>
                        <p>{change.date}</p>{change.change}
                        </p>
                    )
                )}
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                </div>

                </div>
            </div>
            </div>
        </Fragment>
    )
}

export default ChangesHistory