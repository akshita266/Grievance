import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import "./admingrievance.css";

const Admingrievance = () => {
  const [grievances, setGrievances] = useState([]);
  const [isadmin , setisadmin] = useState(localStorage.getItem("isAdmin"))

  useEffect(() => {
    const fetchGrievance = async () => {
      try {
        const response = await fetch("http://localhost:4000/grievancedata", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          const sortedGrievances = data.sort((a, b) => new Date(a.date) - new Date(b.date));
          setGrievances(sortedGrievances);
        } else {
          console.error("Failed to fetch grievance data");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchGrievance();
  }, []);
  
  const handleLogout = async (isadmin) => {
    localStorage.setItem("isAdmin","False") 
  }
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete the resource");
      }
      // Update the state to reflect the deletion
      setGrievances((prevGrievances) =>
        prevGrievances.filter((grievance) => grievance._id !== id)
      );
      console.log("Grievance deleted successfully");
    } catch (error) {
      console.error("Error deleting the grievance:", error);
    }
  };

  return (
    <>
      <div className="Gtable-container">
        <table className="Gtable table-dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Names</th>
              <th>Enrollment No.</th>
              <th>Email</th>
              <th>Grievance</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {grievances.map((grievance) => (
              <tr key={grievance._id}>
                <td data-label="ID">{grievances.indexOf(grievance) + 1}</td>
                <td data-label="Names">{grievance.name}</td>
                <td data-label="Enrollment No.">{grievance.enrollment_no}</td>
                <td data-label="Email">{grievance.email}</td>
                <td data-label="Grievance">{grievance.grievance}</td>
                <td data-label="Status" className={grievance.status === "Not seen" ? "red-text" : "green-text"}>{grievance.status}</td>
                <td data-label="Feedback">{grievance.feedback}</td>
                <td data-label="Date">{new Date(grievance.date).toLocaleDateString()}</td>
                <td data-label="Action">
                <div className='action-tag'>
                  <div className='updategri'>
                    <Link to={`/update/${grievance._id}`} className="btn1 btn-update mx-4 mb-1 update">Update</Link>
                  </div>
                  <button onClick={() => handleDelete(grievance._id)} className="btn2 btn-delete mx-4 mb-1">Delete</button>
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="logout">
        <Link to="/login" className="btn btn-outline-warning mx-4 mb-1 update" onClick={() => handleLogout(isadmin)}>Logout as Admin</Link>
      </div>
      <br />
    </>
  );
};

export default Admingrievance;
