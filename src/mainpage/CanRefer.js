import React, { useState,useEffect  } from 'react';
import { firebase, auth, storage } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import "../Css/needReferral.css";
import {CircularProgress} from '@mui/material';
import FilesTable from './FilesTable';
import { firebase, auth } from '../firebase';
import { sendSignInLinkToEmail, signInWithEmailLink, EmailAuthProvider } from 'firebase/auth';



const CanRefer = () => {
    
    const [workEmail, setWorkEmail] = useState("");
    const [currentCompany, setCurrentCompany] = useState("");
    const [jobDepartment, setJobDepartment] = useState("");
    const [experienceRequired, setExperienceRequired] = useState("");

    const [usersData, setusersData] = useState('');
    const [isLoading, setIsLoading] = useState(true);

	
    const [showVerification, setShowVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);

    const [isValid, setIsValid] = useState(false);


    const db = firebase.firestore();
    const userUniqueId = auth.currentUser.uid;

    const handleSubmit = () => {
        pushUserDetails();
    }
useEffect(() => {
  const fetchUserData = async () => {
    try {
      const docRef = doc(db, "userData", userUniqueId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setusersData(docSnap.data());
      } else {
        console.log("Document does not exist");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  fetchUserData();
}, [db, userUniqueId]);

useEffect(() => {
  // Update the workEmail state when the browser autofill fills the input
  if (workEmail) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = emailRegex.test(workEmail);
    setIsValid(isValidEmail);
  }
}, [workEmail]);

useEffect(() => {
  if (!isLoading && usersData.CanReferFormSubmitted === true) {
    // Handle the case when the form has been submitted
  }
}, [isLoading, usersData.CanReferFormSubmitted]);


    const pushUserDetails = async () => {
        try {
            db.collection("userData").doc(auth.currentUser.uid).update({
                referrerEmail: workEmail,
                referrerCurrentCompany: currentCompany,
                referrerJobDepartment: jobDepartment,
                referrerExperienceRequired: experienceRequired,
                CanReferFormSubmitted: true,
                CanRefer: true 
            });
            alert("Thanks for Submitting Details")
            
        } catch (error) {
            console.log(error)
        }
    }

    // Check if email address is valid
    // TODO(srivatsav): If yes, send an OTP to the users email
    const handleSendOTP = (e) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setIsValid(emailRegex.test(workEmail));
        
        if (isValid === false) {
          alert('Enter a valid email: ' + workEmail);
        } else {
          let index = workEmail.indexOf('@');
          let indexqi2 = workEmail.indexOf('.');
          if (indexqi2 > 0) {
            setCurrentCompany(workEmail.substring(index+1,indexqi2));
            setEmailVerified(true);
      
            // Send the email verification link
            const actionCodeSettings = {
              url: window.location.href,
              handleCodeInApp: true,
            };
      
            sendSignInLinkToEmail(auth, workEmail, actionCodeSettings)
              .then(() => {
                setShowVerification(true);
              })
              .catch((error) => {
                console.log('Error sending email verification link:', error);
              });
          }
        }
      };
      

    const handleVerify = () => {
  if (verificationCode === null) {
    alert('Please enter the OTP');
  } else {
    signInWithEmailLink(auth, workEmail, window.location.href)
      .then((result) => {
        // User successfully signed in with the email link
        setShowVerification(false);
        setEmailVerified(true);

        // Link the accounts
        const credential = EmailAuthProvider.credentialWithLink(workEmail, window.location.href);

        auth.currentUser.linkWithCredential(credential)
          .then((usercred) => {
            const linkedUser = usercred.user;
            console.log('Accounts linked successfully:', linkedUser);
            // Perform any necessary actions after successful account linking
          })
          .catch((error) => {
            console.log('Account linking failed:', error);
            // Handle any errors that occur during account linking
          });
      })
      .catch((error) => {
        console.log('Error verifying email:', error);
      });
  }
};



    
	if (isLoading) {
		return (
			<div className="App-Loader">
				<CircularProgress />
			</div>
		);
	}


    if (!isLoading && usersData.CanReferFormSubmitted === true) {
        return (<section class="referral-form">

            <div style={{display: "grid" , justifyContent : "center", fontFamily: "cursive"}}>
                <p>
                    Thanks for being referral-Bro below you can find the bro's details who need referral
                </p>
            </div>
            <br></br>
            <FilesTable/>
        </section>
        )
    }
    if(!isLoading ){
    return (
        <section class="referral-form">
            <div>
                <p>
                    Make referring talented candidates to your company easy.
                    Simply share your work email to receive resumes directly in your inbox from potential candidates actively seeking work.
                    Help us find top talent and earn a bonus by referring great candidates!
                </p>
            </div>
            <div class="referral-form__separator" />
            <form class="referral-form__form">
                {!showVerification ? (
                    <>
                        <label class="referral-form__label" htmlFor="work-email">
                            Enter your work email:
                        </label>
                        <input class="referral-form__input" id="work-email" type="text" value={workEmail} onChange={(e) => setWorkEmail(e.target.value)} />

                        {!emailVerified && (
                            <div class="referral-form__submit-section">
                                <button class="referral-form__submit-button" type="button" onClick={handleSendOTP}>
                                    Submit
                                </button>
                            </div> 
                        )}
                    </>
                ) : (
                    <>
                        <label class="referral-form__label" htmlFor="verification-code">
                            Enter the verification code:
                        </label>
                        <input class="referral-form__input" id="verification-code" type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
                        <div class="referral-form__submit-section">
                            <button class="referral-form__submit-button" type="button" onClick={handleVerify}>
                                Verify email
                            </button>
                        </div>
                    </>
                )}
                {emailVerified && (
                    <>
                        <label class="referral-form__label" htmlFor="current-company">
                            Enter your current company:
                        </label>
                        <input class="referral-form__input" id="current-company" type="text" value={currentCompany} />

                        <label class="referral-form__label" htmlFor="job-department">
                            Enter the department for the open position:
                        </label>
                        <input class="referral-form__input" id="job-department" type="text" value={jobDepartment} placeholder="e.g. engineering, sales, marketing" onChange={(e) => setJobDepartment(e.target.value)} />

                        <label class="referral-form__label" htmlFor="experience-required">
                            Enter years of experience required:
                        </label>
                        <input class="referral-form__input" id="experience-required" type="number" value={experienceRequired} onChange={(e) => setExperienceRequired(e.target.value)} />

                        <div class="referral-form__submit-section">
                            <button class="referral-form__submit-button" type="button" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </>
                )}

            </form>
        </section>
    );
                }
}

export default CanRefer;