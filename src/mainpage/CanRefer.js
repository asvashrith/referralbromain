import React, { Component,useState,useEffect  } from 'react';
import { firebase, auth, storage } from '../firebase';
import "../Css/needReferral.css"

const CanRefer = () => {
    const [workEmail, setWorkEmail] = useState("");
    const [currentCompany, setCurrentCompany] = useState("");
    const [jobDepartment, setJobDepartment] = useState("");
    const [experienceRequired, setExperienceRequired] = useState("");

	const [isLoading, setisLoading] = useState(true);
	const [userData, setUserData] = useState('');
	
    const [showVerification, setShowVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);

    const db = firebase.firestore();
    const userUniqueId = auth.currentUser.uid;

    const handleSubmit = () => {
        pushUserDetails();
    }

    const pushUserDetails = async () => {
        try {
            db.collection("userData").doc(auth.currentUser.uid).update({
                referrerEmail: workEmail,
                referrerCurrentCompany: currentCompany,
                referrerJobDepartment: jobDepartment,
                referrerExperienceRequired: experienceRequired,
            });
            console.log("details updated succesfully")
        } catch (error) {
            console.log(error)
        }
    }

    // Check if email address is valid
    // TODO(srivatsav): If yes, send an OTP to the users email
    const handleSendOTP = (e) => {
        let index = workEmail.indexOf('@');
        let indexqi2 = workEmail.indexOf('.');
        if (indexqi2 > 0) {
            setCurrentCompany(workEmail.substring(index+1,indexqi2));
            setShowVerification(true);
        }
    }

    // TODO(srivatsav): Verify if OTP is valid
    const handleVerify = () => {
        if (verificationCode === "1234") {
            setShowVerification(false);
            setEmailVerified(true);
        }
    }

    return (
        <section class="referral-form">
            <div>
                <p>
                    Make referring talented candidates to your company easy. Simply share your work email to receive resumes directly in your inbox from potential candidates actively seeking work. Help us find top talent and earn a bonus by referring great candidates!
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
                                    Send OTP
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

export default CanRefer;