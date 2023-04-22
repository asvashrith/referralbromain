import React, { useEffect } from 'react';
import { auth } from '../firebase';
import { BrowserRouter as Router, Routes, Route, Link , useNavigate } from "react-router-dom";
import CanRefer from '../mainpage/CanRefer';
import AboutPage from '../mainpage/AboutPage';
import NeedReferral from '../mainpage/NeedReferral';
import StudentPage from '../mainpage/StudentPage';
import AdminPage from '../admin/AdminPage';
import Footerpage from '../footer/footer';
import '../Css/landingPage.css';
import { 
	Nav,
	NavLink,
	NavMenu,
} from '../mainpage/NavbarElements';

const Mainpage = () => {
	const logout = () => {
		auth.signOut();
	}
	
	return (

<div class = "mainPageParent">		
		<Router>
			<div class = "headingTag">
				<center>
					<div class = "headingTagText">ReferralBro </div>
								</center>
			</div>
			
				<Nav>
					<NavMenu>
						<NavLink  to='/about'>About</NavLink>
						<NavLink to='/needReferral' >Need Referral</NavLink>
						<NavLink to='/canRefer'>Can Refer</NavLink>
						<NavLink to='/student' >Student</NavLink>

						<NavLink to={"#"}>
							<button class = 'navItems' onClick={logout}>logout</button>
						</NavLink>
					</NavMenu>
				</Nav>

				{/* Routes are defined below				 */}
				<Routes>
					<Route path="/needReferral" element={<NeedReferral />} />
					<Route path="/canRefer" element={<CanRefer />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/student" element={<StudentPage />} />
					<Route path="/admin"  element={<AdminPage />} />
					<Route path="" element={<AboutPage />} />
					<Route path='foots' element = {<Footerpage/>} />
				</Routes>

			</Router>
				<Footerpage />
		
</div>
	);
}

export default Mainpage;
