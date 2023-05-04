import React, { useState, useEffect } from 'react';
import { firebase, auth, storage } from '../firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import JobCards from '../admin/Jobcards';

const StudentPage = () => {

  return (
    <div>
    <p>Job oppurtunities for students and early careers</p>
    <JobCards/>
    </div>
  );
};

export default StudentPage;
