import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   name: "",
   description: "",
   price: "",
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
     console.log("get data",record);
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
   const editedPackege = {
     name: form.name,
     description: form.description,
     price: form.price,
   };
   
 console.log("Data set",editedPackege);
   // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPackege),
     headers: {
       'Content-Type': 'application/json'
     },
   });
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Package</h3>
     <form onSubmit={(e)=>onSubmit(e)}>
       <div className="form-group">
         <label htmlFor="name">Name: </label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="description">Description: </label>
         <input
           type="text"
           className="form-control"
           id="description"
           value={form.description}
           onChange={(e) => updateForm({ description: e.target.value })}
         />
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
             value="Semi_luxcury"
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
             id="priceLuxsury"
             value="Luxsury"
             checked={form.level === "Luxsury"}
             onChange={(e) => updateForm({ price: e.target.value })}
           />
           <label htmlFor="priceLuxsury" className="form-check-label">Luxsury</label>
       </div>
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}