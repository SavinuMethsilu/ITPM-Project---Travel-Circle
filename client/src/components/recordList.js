import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Record = (props) => (
 <tr>
   <td>{props.record.topic}</td>
   <td>{props.record.description}</td>
   <td>{props.record.sub_category}</td>
   <td>
     <Link className="btn btn-warning" to={`/edit/${props.record._id}`}>Edit</Link> &nbsp;&nbsp;  |  &nbsp;&nbsp;  
     <button className="btn btn-danger"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       
          Delete
     </button>
   </td>
 </tr>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);

 const [serachItem,setserachItem] =useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5000/record/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:5000/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 // This method will map out the records on the table
 function recordList() {
   return records.filter((recordsdata)=>{
    if(serachItem==""){
      return recordsdata
    }else if(recordsdata.topic.toLowerCase().includes(serachItem.toLowerCase())){
      return recordsdata
    }
  })
   .map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <center>
     

   <div  style={{ marginleft:"50%", marginright:"50%",marginbottom:"50%", height:"500px", width:"85%" }}>

     <br/>
     <br/>
     <h3>Record List</h3>
     
     <br/>
            <div  class="text-center mt-3" >
                  <div className="container ">
                    <div align="left">
                      <h5>Search Record By Topic</h5>
                    </div>
                    
                      <div class="input-group" style={{width:"350px"}} >
                        
                        <input type="search" 
                        class="form-control rounded" 
                        placeholder="Search topic" 
                        aria-label="Search" 
                        onChange={event=>{setserachItem(event.target.value)}} 
                        aria-describedby="search-addon" 
                        
                        />
                        
                      </div>
                </div> 
          </div>
     <br/>
     <br/><br/><br/>
     
    <center>
     <table className="table table-striped" style={{ backgroundColor:"Silver"}}>
       
       <thead>
         <tr>
           <th>Topic</th>
           <th>Description Title</th>
           <th>Sub Category</th>
           <th>Action</th>
         </tr>
       </thead>
       
       <tbody>{recordList()}</tbody>
     </table>
    </center>

    <br/>
    <br/>     
   </div>
   
        <table id >
        <thead>
          <tr>
            <th>Topic</th>
            <th>Description</th>
            <th>Sub Category</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>

      </table>
      
 </center>

 
 );
}