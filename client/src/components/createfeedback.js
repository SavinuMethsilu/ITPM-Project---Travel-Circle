import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
  email: "",
  description: "",
  rating: "",
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

   if(newPerson.email == '' || newPerson.description == '' || newPerson.rating == '')
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
 
   setForm({ email: "", description: "", rating: "" });
   navigate("/");
  }
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Feedback</h3>
     <div style={{height:"100%", width:"100%",  backgroundColor:"Silver", marginBottom:'10px'}}>
     <div className="col-md-8 mt-4 mx-auto">
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="email">Email</label>
         <input
           type="text"
           className="form-control"
           id="email"
           value={form.email}
           onChange={(e) => updateForm({ email: e.target.value })}
         />
       </div>
       
       <div className="form-group">
         <label htmlFor="description">Description</label>
         
         <textarea rows="6"  class ="form-control" name="description" id="description" onChange={(e) => updateForm({ description: e.target.value })}></textarea>
       </div>

       <div className="form-group">
       <label htmlFor="rating">Rate Us</label><br/>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionIntern"
             value="Excellent"
             checked={form.rating === "Excellent"}
             onChange={(e) => updateForm({ rating: e.target.value })}
           />
           <label htmlFor="positionIntern" className="form-check-label">Excellent</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionJunior"
             value="Good"
             checked={form.rating === "Good"}
             onChange={(e) => updateForm({ rating: e.target.value })}
           />
           <label htmlFor="positionJunior" className="form-check-label">Good</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionSenior"
             value="Unsatisfied"
             checked={form.rating === "Unsatisfied"}
             onChange={(e) => updateForm({ rating: e.target.value })}
           />
           <label htmlFor="positionSenior" className="form-check-label">Unsatisfied</label>
         </div>
       </div>
       <br></br>
      
       <div className="form-group">
         <input
           type="submit"
           value="Create New Feedback"
           className="btn btn-success"
         />
       </div>
     </form>
     </div>
     </div>
   </div>
 );
}