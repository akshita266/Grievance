import React, { useState, useEffect } from "react";
import "./userprofile.css";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    enrollment_no: "",
    mobile: "",
    father_name: "",
    grievances: [],
  });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authtoken");
      if (!token) {
        console.log("Token not found in localStorage");
        return;
      }

      const response = await fetch("http://localhost:4000/getdata", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response data:", data);
        if (data && data.userdata && data.userdata.user) {
          const { name = "", email = "", enrollment_no = "", grievances = [], father_name = "", mobile = "" } = data.userdata.user;
          setUserData({ name, email, enrollment_no, grievances, father_name, mobile });
        } else {
          console.error("User data not found in response:", data);
        }
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container3">
  <div className="profile">
    <h1>PROFILE</h1>
    <form className="box3">
      <div className="data3">
        <label htmlFor="enrollment_no" className="form-label3">Enrollment Number</label>
        <input type="number" className="form-control3" name="enrollment_no" id="enrollment_no" value={userData.enrollment_no} readOnly />
      </div>
      <div className="data">
        <label htmlFor="name" className="form-label3">Name</label>
        <input type="text" className="form-control3" name="name" id="name" value={userData.name} readOnly />
      </div>
      <div className="data">
        <label htmlFor="father_name" className="form-label3">Father Name</label>
        <input type="text" className="form-control3" name="father_name" id="father_name" value={userData.father_name} readOnly />
      </div>
      <div className="data">
        <label htmlFor="email" className="form-label3">Email</label>
        <input type="email" className="form-control3" name="email" id="email" value={userData.email} readOnly />
      </div>
      <div className="data">
        <label htmlFor="mobile" className="form-label3">Mobile</label>
        <input type="number" className="form-control3" name="mobile" id="mobile" value={userData.mobile} readOnly />
      </div>
    </form>
  </div>
  <div className="gt">
    <h2>GRIEVANCE DATA</h2>
    <table className="Gtable table-dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Grievance</th>
          <th>Status</th>
          <th>Feedback</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {userData.grievances.map((grievance, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{grievance.grievance}</td>
            <td className={grievance.status === "Not seen" ? "red-text" : "green-text"}>{grievance.status}</td>
            <td>{grievance.feedback}</td>
            <td>{new Date(grievance.date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default UserProfile;
