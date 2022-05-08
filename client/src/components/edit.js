import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   topic: "",
   description: "",
   sub_category: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     name: form.topic,
     position: form.description,
     level: form.sub_category,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5000/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Record</h3>
     <div style={{height:"100%", width:"100%",  backgroundColor:"Silver", marginBottom:'10px'}}>
     <div className="col-md-8 mt-4 mx-auto">
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="topic">Topic: </label>
         <input
           type="text"
           className="form-control"
           id="topic"
           value={form.topic}
           onChange={(e) => updateForm({ topic: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="description">Description</label>
         
         <textarea rows="6"  class ="form-control" name="description" id="description" onChange={(e) => updateForm({ description: e.target.value })}></textarea>
       </div>

       <div className="form-group">
         <label htmlFor="sub_category">Sub Category: </label>
         <input
           type="text"
           className="form-control"
           id="sub_category"
           value={form.sub_category}
           onChange={(e) => updateForm({ sub_category: e.target.value })}
         />
       </div>
      
       <br />
       <br/>
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
     </div>
   </div>
   </div>
 );
}