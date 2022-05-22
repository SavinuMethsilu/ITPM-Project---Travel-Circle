import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const Record = (props) => (
 <tr>
   <td>{props.record.CardType}</td>
   <td>{props.record.cardNo}</td>
   <td>{props.record.month}</td>
   <td>{props.record.year}</td>
   <td>{props.record.cvn}</td>
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
 const [data,setData]=useState([]);  // excel set data to download
 
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
     setData(records); // assign data
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
     <h3>Payment</h3>
     
     <br/>
            <div  class="text-center mt-3" >
                  <div className="container ">
                    <div align="right">
                      <h5>Search Record By Card No</h5>
                    
                    
                      <div class="input-group" style={{width:"350px"}} >
                        
                        <input type="search" 
                        class="form-control rounded" 
                        placeholder="Search Card no" 
                        aria-label="Search" 
                        onChange={event=>{setserachItem(event.target.value)}} 
                        aria-describedby="search-addon" 
                        
                        />
                        
                      </div>
                      </div>
                </div> 
          </div>

     <br/>
     <br/>
     <div align="left"> 
       {/* //button */}
              <ReactHTMLTableToExcel
                className="btn btn-outline-success"
                table="convertToExcel"    //table assignID
                filename="Record Excel"
                sheet="Sheet"
                buttonText="Download record list"
              />
            </div>
     <br/><br/>
     
    <center>
     <table className="table table-striped" style={{ backgroundColor:"Silver"}}>
       
       <thead>
         <tr>
           <th>Card type</th>
           <th>Card Number</th>
           <th>Month</th>
           <th>Year</th>
           <th>CVN</th>
           <th>Action</th>
         </tr>
       </thead>
       
       <tbody>{recordList()}</tbody>
     </table>
    </center>

    <br/>
    <br/>     
   </div>
   <br/>
         <table id="convertToExcel" style={{display:"none"}} > {/* // top assign ID */}
        <thead>
          <tr>
            <th>#</th>
            <th>Card type</th>
           <th>Card Number</th>
           <th>Month</th>
           <th>Year</th>
           <th>CVN</th>
          </tr>
        </thead>
        <tbody>
        {data.map((record,index)=>(                   //To map data assign in dataset
                       <tr>
                         <th scope="row">{index+1}</th>
                           <td>{record.CardType}</td>
                           <td>{record.cardNo}</td>
                           <td>{record.month}</td>
                           <td>{record.year}</td>
                           <td>{record.cvn}</td>
                   </tr>  
                ))}
        </tbody>

      </table>
      
 </center>

 
 );
}