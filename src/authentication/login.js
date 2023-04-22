import React, { useState,useEffect } from 'react';
import { firebase, auth } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import "../Css/loginPage.css";
import 'react-phone-input-2/lib/style.css'
import { PhoneInput } from 'react-contact-number-input';
import Popup from "reactjs-popup";




const Login = () => {
	// Inputs
	const [myPhonenumber, setmyPhonenumber] = useState("");
	const [myname, setmyname] = useState("");
	const [otp, setotp] = useState('');
	const [show, setshow] = useState(false);
	const [final, setfinal] = useState('');
	const db = firebase.firestore();



	// Sent OTP
	
	const signin = async (e) => {
		
		
		// Need to check why myPhonenumber is returning a object instead of number after taking input
		if (myPhonenumber.validData.phoneNumber === "" || myPhonenumber.validData.phoneNumber.length < 10) return;

		let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');

		auth.signInWithPhoneNumber(myPhonenumber.validData.phoneNumber,verify).then((result) => {
			setfinal(result);
			alert("code sent")
			setshow(true);
		})
			.catch((err) => {
				alert(err);
				window.location.reload()
			});

		e.preventDefault();

		
		
		// setmyname("");
		// setmyPhonenumber("");

	}
	
	// Validate OTP
	const ValidateOtp = () => {
		if (otp === null || final === null)
			return;
		final.confirm(otp).then(() => {
			pushUserDetails();			
			// success
		}).catch(() => {
			alert("Wrong code");
		})
	}
	const pushUserDetails = async () => {
		try {
			const docRef = doc(db, "userData",auth.currentUser.uid);
			const docSnap = await getDoc(docRef);
			if(docSnap.exists()) {
				console.log(docSnap.data());
			} else {
				console.log("Document does not exist")
				db.collection("userData").doc(auth.currentUser.uid).set({
					myname: myname,
					Number: myPhonenumber.validData.phoneNumber,
					Country: myPhonenumber.countryData.name
				});
			}		
		} catch(error) {
			console.log(error)
		}
	}
	

	return (
		<div class = "parent">
			<div>
				<center>
					<h1>ReferralBro</h1>
				</center>
			</div>
			<div>

				<div class = "parentLogin">
					<div class="inputBox" >
						<div class="phoneInputName">Enter Phone Number
							<PhoneInput
								placeholder="Enter phone number"
								value={myPhonenumber}
								onChange={setmyPhonenumber}
							/>
						</div>
						<br></br>
						<div class="nameInputName">Enter your Name
							<br></br>

							<input class = "inputNameBox"
								value={myname}
								onChange={(e) => { setmyname(e.target.value) }}
								placeholder="Name"
							/>
						</div>
						<br /><br />
						<div class="captcha" id="recaptcha-container"></div>
						<button class="loginButton"
							onClick={signin}>Send OTP
						</button>
						<div style={{ display: show ? "block" : "none" }}>
							<div class = "inputOtpName">Enter OTP </div>
						
							<input class="inputOTP"
								type="text"
								placeholder={"Enter your OTP"}
								onChange={(e) => { setotp(e.target.value) }}>
							</input>
							<br /><br />
							<button class="verifyButton"
								onClick={ValidateOtp}>Verify
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Login;
