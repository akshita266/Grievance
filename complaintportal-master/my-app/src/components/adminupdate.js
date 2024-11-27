import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import "./adminupdate.css"
const Adminupdate = () => {
  const history = useNavigate();
  const { id } = useParams();

  const [grievance, setGrievance] = useState("");
  const [feedback, setFeedback] = useState("");  

  useEffect(() => { 
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:4000/grievance/" + id);
        const data = await res.json();
        setGrievance(data.grievance);
        setFeedback(data.feedback); 
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handlereset = async e => {
    console.log("update cancelled");
    history('/admin-grievance');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submitted");
    try {
      const res = await fetch("http://localhost:4000/update/" + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'Seen',
          feedback: feedback
        })
      });
      console.log(res);
      history('/admin-grievance');
    } catch (error) {
      console.error('Error updating grievance:', error);
    }
  };

  return (
    <div>
      <form className="box2" onSubmit={handleSubmit}>
        <h1> Update Grievance</h1>
        <div className="form-group1">
          <label htmlFor="grievance">Grievance</label>
          <input type="text" className="form-control1" id="grievance" value={grievance} readOnly />
        </div>
        <div className="form-group1">
          <label htmlFor="status">Status</label>
          <input type="text" className="form-control1" id="status" value="Seen" readOnly />
        </div>
        <div className="form-group1">
          <label htmlFor="feedback">Feedback</label>
          <input type="text" className="form-control1" id="feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
        </div>
        <div className='actions'>
          <button type="submit" className="btn3 btn-primary" >Update</button>
          <button type='reset' className='cancel' onClick={handlereset}>Cancel</button>
        </div>
        
      </form>
    </div>
  );
};

export default Adminupdate;

