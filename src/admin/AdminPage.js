import React, { useState } from 'react';
import { firebase, auth, storage } from '../firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import JobCards from './Jobcards';

const AdminPage = () => {
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [url, setUrl] = useState('');
  const [driveType, setDriveType] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [salaryExpectations, setSalaryExpectations] = useState('');
  const [isActiveJob, setisActiveJob] = useState('');


  const db = firebase.firestore();

  const handleSubmit = (event) => {
    event.preventDefault();

    db
      .collection('jobs')
      .add({
        companyName,
        jobTitle,
        url,
        driveType,
        eligibility,
        salaryExpectations,
        isActiveJob : true
      })
      .then(() => {
        setCompanyName('');
        setJobTitle('');
        setUrl('');
        setDriveType('');
        setEligibility('');
        setSalaryExpectations('');
      });
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Job Title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Drive Type"
        value={driveType}
        onChange={(e) => setDriveType(e.target.value)}
      />
      <input
        type="text"
        placeholder="Eligibility"
        value={eligibility}
        onChange={(e) => setEligibility(e.target.value)}
      />
      <input
        type="text"
        placeholder="Salary Expectations"
        value={salaryExpectations}
        onChange={(e) => setSalaryExpectations(e.target.value)}
      />
      <button type="submit">Save Job</button>
    </form>
     <JobCards/></>
  );
};

export default AdminPage;
