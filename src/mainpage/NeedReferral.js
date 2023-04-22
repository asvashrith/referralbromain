import React, { Component, useState, useEffect } from 'react';
import { firebase, auth, storage } from '../firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "../Css/needReferral.css"
import Login from '../authentication/login';
import Popup from "reactjs-popup";



const NeedReferral = () => {
    const [fullName, setfullName] = useState("");
    const [currentCompany, setcurrentCompany] = useState("");
    const [currentRole, setcurrentRole] = useState("");
    const [currentLocation, setcurrentLocation] = useState("");
    const [phone, setphone] = useState("");
    const [isLoading, setisLoading] = useState(true);
    const [usersData, setusersData] = useState('');
    const [resumeFile, setresumeFile] = useState('');
    const [newresumeFile, setnewresumeFile] = useState('');
    const db = firebase.firestore();
    const userUniqueId = auth.currentUser.uid;

    useEffect(async () => {

        try {
            const docRef = doc(db, "userData", userUniqueId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setusersData(docSnap.data());
                setisLoading(false)
            } else {
                console.log("Document does not exist")
            }
        } catch (error) {
            console.log(error)
        }

    });

    const pushUserDetails = async () => {
        try {
            db.collection("userData").doc(auth.currentUser.uid).update({
                userFullName: fullName,
                userCurrentCompany: currentCompany,
                userCurrentLocation: currentLocation,
                userCurrentRole: currentRole,
                formSubmitted: true
            });
            console.log("details updated succesfully")
        } catch (error) {
            console.log(error)
        }
    }

    const upload = () => {
        if (resumeFile == null)
            return;
        storage.ref(`/resumeFiles/${auth.currentUser.uid}`)
            .put(resumeFile)
            .on("state_changed", alert("success"), alert);
        pushUserDetails();
    }

    const uploadAgain = () => {
        if (newresumeFile == null)
            return;
        storage.ref(`/resumeFiles/${auth.currentUser.uid}`)
            .put(newresumeFile)
            .on("state_changed", alert("success"), alert);
    }
    const updateDetails=()=>{
        usersData.formSubmitted = false
    
    }
    const openPopupForResumeUpload = () => {
        <Popup trigger={<button> Trigger</button>} position="right center">
            <div>Popup content here !!</div>
        </Popup>

    }

    if (!isLoading && usersData.formSubmitted !== true) {
        return (

            <div class='needReferralBox'>
                <label class='label'>Enter you full Name</label>
                <input type="Text"
                    value={fullName}
                    onChange={(e) => { setfullName(e.target.value) }} />


                <label class='label'>Enter your phone</label>
                <input type="Text"
                    placeholder={usersData.Number}
                    value={phone}
                    onChange={(e) => { setphone(e.target.value); }} />

                {/* <label class='label'>Enter your location</label>
                <input type = "Text"
                    value = {currentLocation} 
                    onChange  = {(e) => { setcurrentLocation(e.target.value)}} /> */}

                <label class='label'>Enter your currentCompany</label>
                <input type="Text"
                    value={currentCompany}
                    onChange={(e) => { setcurrentCompany(e.target.value) }} />
                <label class='label'>Enter your currentRole</label>
                <input type="Text"
                    value={currentRole}
                    onChange={(e) => { setcurrentRole(e.target.value) }} />
                <br></br>
                <label class='label'>Upload your Resume</label>
                <br></br>
                <input type="File" onChange={(e) => { setresumeFile(e.target.files[0]) }} />
                <br></br>
                <button onClick={upload}>Submit</button>
            </div>
        );
    }
    else if (usersData.formSubmitted === true) {
        return (
            <div class='needReferralBox'>
                <p>Hello {usersData.myname} your form is submitted your resume will be shared</p>
                <label>If you wanna update resume click below</label>
                <button class = "myButton" onClick={updateDetails}>Update details</button>

                {/* <Popup trigger={<button> update resume</button>} position="right center">
                    <div>
                        <input type='file' onChange={(e) => { setnewresumeFile(e.target.files[0]) }}></input>
                        <button onClick={uploadAgain}>Upload</button>
                    </div>
                </Popup> */}
            </div>
        );

    } else {
        return null;
    }

}

export default NeedReferral;