import React, { useState, useEffect } from 'react';
import { firebase, auth, storage } from '../firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import JobCards from '../admin/Jobcards';
import '../Css/studentPage.css'

const StudentPage = () => {

  return (
    <div class='bodyContainer'>
      <p>Job oppurtunities for students and early careers</p>
      <JobCards/>
    </div>
  );
};

export default StudentPage;
