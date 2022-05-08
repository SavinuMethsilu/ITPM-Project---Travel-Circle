import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
  topic: "",
  description: "",
  sub_category: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };

   if(newPerson.topic == '' || newPerson.description == '' || newPerson.sub_category == '')
   {
     alert("Please enter all details in the fields");
   }
   else
   {
   await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ topic: "", description: "", sub_category: "" });
   navigate("/");
 }
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <div style={{height:"100%", width:"100%",  backgroundColor:"Silver", marginBottom:'10px'}}>
     <div className="col-md-8 mt-4 mx-auto">
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="topic">Topic</label>
         <input
           type="text"
           className="form-control"
           id="topic"
           value={form.topic}
           onChange={(e) => updateForm({ topic: e.target.value })}
         />
       </div>
        &nbsp;
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
       <br></br>
      
       <div className="form-group">
         <input
           type="submit"
           value="Create category"
           className="btn btn-success"
         />
       </div>
     </form>
     </div>
     </div>
   </div>
 );
}