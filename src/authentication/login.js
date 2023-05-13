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
		if (
			!myPhonenumber.validData ||
			!myPhonenumber.validData.phoneNumber ||
			myPhonenumber.validData.phoneNumber.length < 10
		) {
			alert("Please enter a valid phone number");
        	return;
		}

		if (myname.length < 3) {
			alert("Name should be at least 3 letters long");
			return;
		}
		
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
		if (otp === null || final === null) return;
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
		<div class="parent">
			<div  class = "headerLabel1">Referral-Bro</div>
			<div class="inputBox">
				{/* Header section */}
				<div>
					<div class="headerLabel">Login/SignUp</div>
				</div>

				{/* Captcha section */}
				{show ? (
					<div class="enterOtpLayout">
						<div class="labelInput">Enter OTP</div>
						<input
							class="inputNameBox"
							type="text"
							placeholder={"Enter your OTP"}
							onChange={(e) => {
							setotp(e.target.value);
							}}
						/>
						<div class='notReceivedCodeBox'>
							<button class="notReceivedCodeButton" onClick={() => window.location.reload()}>
								Not received code?
							</button>
						</div>
						<button class="login-button" onClick={ValidateOtp}>
							Verify
						</button>
					</div>
				) : (
					<>
						{/* Phone number section */}
						<div class="labelInput">
							Enter Phone Number
							<PhoneInput
								placeholder="Enter phone number"
								value={myPhonenumber}
								onChange={setmyPhonenumber} />
						</div>
						<br/>

						{/* Name section */}
						<div class="nameInputName">
							Enter your Name
							<br/>
							<input 
								class="inputNameBox"
								value={myname}
								onChange={(e) => { setmyname(e.target.value) }}
								placeholder="Name"/>
						</div>
						<br/><br/>
						<div className="captcha" id="recaptcha-container" />
						<button className="login-button" onClick={signin}>
							Send OTP
						</button>
					</>
				)}
			</div>
		</div>
	);
}
export default Login;
