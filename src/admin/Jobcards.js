import React, { useState, useEffect } from 'react';
import { firebase, auth, storage } from '../firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import '../Css/Jobcards.css'

const JobCards = () => {
  const [jobs, setJobs] = useState([]);

  const firestore = firebase.firestore();


  useEffect(() => {
    const unsubscribe = firestore
      .collection('jobs')
      .onSnapshot((snapshot) => {
        const updatedJobs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(updatedJobs);
      });

    return () => {
      unsubscribe();
    };
  }, [firestore]);

  return (
    
    <div>
      {jobs.map((job) => (
        <div class = "job-card" key={job.id}>
          <h3>{job.jobTitle}</h3>
          <p>Company Name: {job.companyName}</p>
          <p>Drive Type: {job.driveType}</p>
          <p>Eligibility: {job.eligibility}</p>
          <p>Salary Expectations: {job.salaryExpectations}</p>
          <a href={job.url}>View Job</a>
        </div>
      ))}
    </div>
  );
};

export default JobCards;
