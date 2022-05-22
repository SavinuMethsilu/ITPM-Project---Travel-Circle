import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
  CardType: "",
  cardNo: "",
  month: "",
  year: "",
  cvn: "",
   
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
     console.log("get data",record)
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
     CardType: form.CardType,
     cardNo: form.cardNo,
     month:form.month,
     year:form.year,
     cvn: form.cvn,
     
   };
 console.log("Data set",editedPerson);
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
     <h3>Update Record</h3><br />
     <form onSubmit={onSubmit}>
     <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionIntern"
             value="Mastercard"
             checked={form.CardType === "Mastercard"}
             onChange={(e) => updateForm({ CardType: e.target.value })}
           />
           <label htmlFor="positionIntern" className="form-check-label">Mastercard</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionSenior"
             value="VISA"
             checked={form.CardType === "VISA"}
             onChange={(e) => updateForm({ CardType: e.target.value })}
           />
           <label htmlFor="positionSenior" className="form-check-label">VISA</label>
       </div>
       </div>
      <br />

       
       <div className="form-group">
         <label htmlFor="cardNo">Card Number: </label>
         <input
           type="text"
           className="form-control"
           id="cardNo"
           value={form.cardNo}
           onChange={(e) => updateForm({ cardNo: e.target.value })}
         />
       </div>

       <label htmlFor="month"></label>
         <div className="form-group">
            <label>Month</label>
            <select className="form-select" placeholder="Month">
                <option>01</option>
                <option>02</option>
                <option>03</option>
                <option>04</option>
                <option>05</option>
                <option>06</option>
                <option>07</option>
                <option>08</option>
                <option>09</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
            </select>
         </div>


         <label htmlFor="year"></label>
         <div className="form-group">
            <label>Year</label>
            <select className="form-select" placeholder="Year">
                <option>2022</option>
                <option>2023</option>
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
                <option>2027</option>
                <option>2028</option>
                <option>2029</option>
                <option>2030</option>
            </select>
         </div>

         <br />


       <div className="form-group">
         <label htmlFor="name">CVN : </label>
         <input
           type="text"
           className="form-control"
           id="cvn"
           value={form.cvn}
           onChange={(e) => updateForm({ cvn: e.target.value })}
         />
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