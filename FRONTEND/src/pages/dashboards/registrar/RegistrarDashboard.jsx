import DashboardLayout from "../../../layouts/DashboardLayout";

import React, {useEffect, useState} from 'react';
import "../../../css/pagecss/registrardashboard.css";







const RegistrarDashboard = () => {
  return (
    <DashboardLayout role="registrar">
      <h2>Registrar Dashboard</h2>

      <div style={{display:"flex", gap:"20px", marginTop:"20px"}}>
      <div className="stat-box">
        <h3>Total Issues</h3>
        <p>{stats.total}</p>
      </div>
      <div className="stat-box">
        <h3>Resolved Issues</h3>
        <p>{stats.resolved}</p>
      </div>
      <div className="stat-box">
        <h3>Pending Issues</h3>
        <p>{stats.pending}</p>
      </div>
      </div>
     


    </DashboardLayout>
  );
};

export default RegistrarDashboard;
