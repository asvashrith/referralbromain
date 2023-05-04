import React, { Component } from 'react';
import { createBootstrapComponent } from 'react-bootstrap/esm/ThemeProvider';
import Mainpage from '../authentication/main';
import '../Css/aboutPage.css';

const AboutPage = () =>{

    return (
      <div className="sectionContainer">
        <div style={{ maxWidth: "800px" }}>
            <p style={{  fontSize: "1.15rem", marginBottom: "2rem" }}>The ReferralBro app offers a platform for users to refer their friends or colleagues for job opportunities, and for users to submit their resumes for referral. It consists of three main sections:
            </p>
            <div>
                <div>
                    <p class="sectionTitle">NEED REFERRAL</p>
                    <p class="sectionDescription">
                    Enables users to submit their resumes along with personal information to be referred for job opportunities.
                    </p>
                </div>
                <div>
                    <p class="sectionTitle">CAN REFER</p>
                    <p class="sectionDescription">
                    Requires users to provide their work email, and the app's administrator will verify and send the relevant resumes to be referred to job opportunities. An OTP verification system via work email is still in development.
                    </p>
                </div>
                <div>
                    <p class="sectionTitle">STUDENT</p>
                    <p class="sectionDescription">
                    Displays current job openings that students can apply for.
                    </p>
                </div>
            </div>
        </div>
      </div>
    );
}
export default AboutPage;
