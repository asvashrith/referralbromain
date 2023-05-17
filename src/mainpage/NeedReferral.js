import React, { Component, useState, useEffect } from 'react';
import { firebase, auth, storage } from '../firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "../Css/needReferral.css"
import Login from '../authentication/login';
import Popup from "reactjs-popup";
import {CircularProgress} from '@mui/material';


const NeedReferral = () => {
    const [fullName, setFullName] = useState("");
    const [currentCompany, setCurrentCompany] = useState("");
    const [currentRole, setCurrentRole] = useState("");
    const [currentLocation, setCurrentLocation] = useState("");
    const [phone, setPhone] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [usersData, setUsersData] = useState('');
    const [resumeFile, setResumeFile] = useState('');
    const [newResumeFile, setNewResumeFile] = useState('');
    const db = firebase.firestore();
    const userUniqueId = auth.currentUser.uid;

    useEffect(async () => {
        try {
            const docRef = doc(db, "userData", userUniqueId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUsersData(docSnap.data());
                setIsLoading(false);
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
        if (newResumeFile == null)
            return;
        storage.ref(`/resumeFiles/${auth.currentUser.uid}`)
            .put(newResumeFile)
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

    
	if (isLoading) {
		return (
			<div className="App-Loader">
				<CircularProgress />
			</div>
		);
	}

    if (!isLoading && usersData.formSubmitted !== true) {
        return (
            <section class="referral-form">
                <div>
                    <p>
                        Find your dream job by connecting with people who can refer you to open positions. Fill out the form below and upload your resume. Our team will review your details and send them to our network. Thank you for choosing us to help in your job search!
                    </p>
                </div>
                <div class="referral-form__separator" />
                <form class="referral-form__form">
                    <label class="referral-form__label" htmlFor="full-name">
                        Enter your full name:
                    </label>
                    <input class="referral-form__input" id="full-name" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />

                    <label class="referral-form__label" htmlFor="phone-number">
                        Enter your phone number:
                    </label>
                    <input class="referral-form__input" id="phone-number" type="number" placeholder={usersData.Number} value={phone} onChange={(e) => setPhone(e.target.value)} />

                    <label class="referral-form__label" htmlFor="current-company">
                        Enter your current company:
                    </label>
                    <input class="referral-form__input" id="current-company" type="text" value={currentCompany} onChange={(e) => setCurrentCompany(e.target.value)} />

                    <label class="referral-form__label" htmlFor="current-role">
                        Enter your current role:
                    </label>
                    <input class="referral-form__input" id="current-role" type="text" value={currentRole} onChange={(e) => setCurrentRole(e.target.value)} />

                    <label class="referral-form__label" htmlFor="resume-file">
                        Upload your resume:
                    </label>
                    <div class="referral-form__file-upload">
                        <input class="referral-form__file-input" id="resume-file" type="file" onChange={(e) => setResumeFile(e.target.files[0])} />
                        <button class="referral-form__file-button" type="button" onClick={(e) => { document.getElementById('resume-file').click() }}>
                            Choose File
                        </button>
                    </div>

                    <div class="referral-form__submit-section">
                        <button class="referral-form__submit-button" type="button" onClick={upload}>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
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