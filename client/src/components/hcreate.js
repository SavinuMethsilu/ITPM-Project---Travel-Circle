import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   name: "",
   description: "",
   price: "",
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
   const newPackege = { ...form };
 
   if(newPackege.name == '' || newPackege.description == '' || newPackege == '')
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
        body: JSON.stringify(newPackege),
      })
      .catch(error => {
        window.alert(error);
        return;
      });
      setForm({ name: "", description: "", price: "" });
      navigate("/");
  }

 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Packege</h3>
     <div style={{ height:"100%", width:"100%", backgroundColor:"Silver", marginBottom:'10px'}}>
       <div className="col-md-8 mt-4 mx-auto">
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div>
         <label htmlFor="description">Description</label>
         
           <textarea style={{width:"100%"}} rows="4" class="from-control" name="description" id="description" onChange={(e) => updateForm({ description: e.target.value })}></textarea>
         
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="priceOptions"
             id="priceNormal"
             value="Normal"
             checked={form.level === "Normal"}
             onChange={(e) => updateForm({ price: e.target.value })}
           />
           <label htmlFor="priceNormal" className="form-check-label">Normal</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="priceOptions"
             id="priceSemi"
             value="Semi_Luxsury"
             checked={form.level === "Semi"}
             onChange={(e) => updateForm({ price: e.target.value })}
           />
           <label htmlFor="priceSemi" className="form-check-label">Semi-Luxsury</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="priceOptions"
             id="priceLuxury"
             value="Luxsury"
             checked={form.level === "Luxsury"}
             onChange={(e) => updateForm({ price: e.target.value })}
           />
           <label htmlFor="priceLuxury" className="form-check-label">Luxsury</label>
         </div>
       </div>

       <br></br>
       <div className="form-group">
         <input
           type="submit"
           value="Create packege"
           className="btn btn-primary"
         />
       </div>
       
     </form>
   </div>
   </div>
   </div>
 );
}