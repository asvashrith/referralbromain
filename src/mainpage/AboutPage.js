import React, {  useEffect,useState } from 'react';
import { createBootstrapComponent } from 'react-bootstrap/esm/ThemeProvider';
import Mainpage from '../authentication/main';
import '../Css/aboutPage.css';
import { firebase, auth, storage } from '../firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";


const AboutPage = () =>{
    const [activeCard, setActiveCard] = useState(null);
    const [usersData, setusersData] = useState('');

    const userUniqueId = auth.currentUser.uid;
    const db = firebase.firestore();
    const [isLoading, setisLoading] = useState(true);

    useEffect(async () => {

        try {
            const docRef = doc(db, "userData", userUniqueId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setusersData(docSnap.data().myname);
                console.log(docSnap.data().myname);
                setisLoading(false)
            } else {
                console.log("Document does not exist")
            }
        } catch (error) {
            console.log(error)
        }

    });


    const cards = [
        {
          title: 'Need Referral',
          description: 'Get a referral from a friend to join our community',
          img: 'https://via.placeholder.com/300x200',
          isExpandable: true,
        },
        {
          title: 'Can Refer',
          description: 'Refer your friends and earn rewards for every successful referral',
          img: '',
          isExpandable: true,
        },
        {
          title: 'Student',
          description: 'Join our community as a student and get access to exclusive resources',
          img: 'https://via.placeholder.com/300x200',
          isExpandable: true,
        },
      ];
    
      const handleCardClick = index => {
        setActiveCard(index);
      };
    
      const handleCardLeave = () => {
        setActiveCard(null);
      };




    return (
      <div className="sectionContainer">
        <div style={{ maxWidth: "800px" }}>
        <p style={{  display: "flex",justifyItems:"center",fontSize: "1.15rem", marginBottom: "2rem" , color: "black"}}>Hello {usersData}
            </p>
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
        <div className="cards-container">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`card ${activeCard === index ? 'active' : ''} ${card.isExpandable ? 'expandable' : ''}`}
          onClick={() => handleCardClick(index)}
          onMouseLeave={() => handleCardLeave()}
        >
          <div className="card-image">
            <img src={card.img} alt={card.title} />
          </div>
          <div className="card-content">
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </div>
        </div>
      ))}
    </div>
        </div>
      </div>
    );
}
export default AboutPage;
