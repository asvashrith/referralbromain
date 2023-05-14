import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '../routes';
import { AppBar, Toolbar } from '@mui/material';
import { auth } from '../firebase';
import { NavLink } from '../mainpage/NavbarElements';
import '../Css/landingPage.css';

const Mainpage = () => {
  const logout = () => {
    auth.signOut();
  };

  return (
    <div className="mainPageParent">
      <Router>
        <div className="headingTag">
          <center>
            <h1 style={{ color: "#E1F2FE" }}>ReferralBro</h1>
          </center>
        </div>

        <AppBar position="sticky" elevation={0} sx={{ backgroundColor: "#2e466e" }}>
          <Toolbar sx={{ alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            <NavLink to='/about'>About</NavLink>
            <NavLink to='/needReferral'>Need Referral</NavLink>
            <NavLink to='/canRefer'>Can Refer</NavLink>
            <NavLink to='/student'>Student</NavLink>
            {/* <NavLink to={"#"}>
              <button className='navItems' onClick={logout}>logout</button>
            </NavLink> */}
          </Toolbar>
        </AppBar>

        <AppRoutes />

      </Router>
      {/* <Footerpage /> */}
    </div>
  );
}

export default Mainpage;
