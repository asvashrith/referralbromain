import React, { Component,useState,useEffect  } from 'react';
import { firebase, auth, storage } from '../firebase';

const CanRefer = () => {
    const [workEmail, setworkEmail] = useState("");
    const [currentCompany, setcurrentCompany] = useState("");
    const [currentRole, setcurrentRole] = useState("");
    const [currentLocation, setcurrentLocation] = useState("");
    const [phone, setphone] = useState("");

	const [isLoading, setisLoading] = useState(true);
	const [usersData, setusersData] = useState('');
	const [resumeFile, setresumeFile] = useState('');
    const db = firebase.firestore();
    const userUniqueId = auth.currentUser.uid;

    const handleChange =(e)=>{
        
        setworkEmail(e.target.value);
        let index = workEmail.indexOf('@');
        let indexqi2 = workEmail.indexOf('.');
        if(indexqi2 > 0){
            setcurrentCompany(workEmail.substring(index+1,indexqi2));
        }

    }
    const sendVerificationLink = ()=>{
        
       }
        return (
        
            <div class='needReferralBox'>
                <p>Verify with your work email so we can share resumes of users for referral interested in your company</p>
                <label class='label'>Enter your work email</label>
                <input type="Text"
                    value = {workEmail}
                    onChange  = {(e)=>{handleChange(e)}} />
                    

                <label class='label'>Company</label>
                <input type = "Text"
                    value = {currentCompany}
                    />

                <br></br>
                
                <button onClick={sendVerificationLink}>Submit</button>

            </div>
    );
}

export default CanRefer;