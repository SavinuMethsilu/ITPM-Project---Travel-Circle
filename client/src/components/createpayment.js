import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   CardType: "",
   cardNo: "",
   month: "",
   year: "",
   cvn: "",
   
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
 
   setForm({ CardType:  "", cardNo: "", month: "", year: "", cvn:"" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div><br />
     <h3>Payment      </h3>
     <div  style={{ height:"50%", width:"50%", backgroundColor:"Silver", marginBottom:'10px'}}>
        <div className="col-md-8 mt-4 mx-auto"><br />
     <form onSubmit={onSubmit}>
     <div className="form-group">
     <label htmlFor="cardType">Card Type : </label><br />
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
         <label htmlFor="cardNo">Card Number :</label>
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
            <select className="form-select" placeholder="Month"
                type="text"
                id="month"
                value={form.month}
                onChange={(e) => updateForm({ month: e.target.value })}
                >
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
            <select className="form-select" placeholder="Year"
            type="text"
            id="year"
            value={form.year}
            onChange={(e) => updateForm({ year: e.target.value })}>
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
           value="       Payment         "
           className="btn btn-primary"
         />
       </div><br />
     </form>
     </div>
     </div>
     
   </div>

   
 );
}