import React, {Fragment} from 'react' 
import ChangesHistory from './ChangesHistory'

const ListWatchers=({watchList, refreshWatchers})=>{

   const removeWatcher= async jobNo=>{
        try {
            await fetch(`http://localhost:4000/removeWatcher/${jobNo}`, {method: "DELETE"})
            refreshWatchers()
        } catch (error) {
            console.error(error.message)
        }
    }   

    return (
        <>
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
        </>
    )
}

export default ListWatchers