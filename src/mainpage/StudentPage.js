import React, { useState, useEffect } from 'react';
import { firebase, auth, storage } from '../firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import JobCards from '../admin/Jobcards';

const StudentPage = () => {

  return (
    <div>
    <p>Job Oppurtunities for students and Early careers</p>
    <JobCards/>
    </div>
  );
};

export default StudentPage;
