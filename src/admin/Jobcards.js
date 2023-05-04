import React, { useState, useEffect } from 'react';
import { firebase, auth, storage } from '../firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import '../Css/Jobcards.css'
import { Card, CardContent,CardActions, Grid } from '@mui/material';
import { Button } from '@mui/material';

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
    
    <Grid container spacing={2}>
      {jobs.map((job) => (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card variant="outlined">
            <CardContent>
              <h3 class='jobTitleCard'>{job.jobTitle}</h3>
              <p>Company Name: {job.companyName}</p>
              <p>Drive Type: {job.driveType}</p>
              <p>Eligibility: {job.eligibility}</p>
              <p>Salary Expectations: {job.salaryExpectations}</p>
            </CardContent>
            <CardActions>
              <Button href={job.url}>
                View Job
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default JobCards;
