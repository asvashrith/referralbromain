import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CanRefer from './mainpage/CanRefer';
import AboutPage from './mainpage/AboutPage';
import NeedReferral from './mainpage/NeedReferral';
import StudentPage from './mainpage/StudentPage';
import AdminPage from './admin/AdminPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/needReferral" element={<NeedReferral />} />
      <Route path="/canRefer" element={<CanRefer />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/student" element={<StudentPage />} />
      <Route path="/referralbromain" element = {<AboutPage/>}/>
      <Route exact path="" element={<AboutPage />} />
      <Route  path="*" element={<AboutPage />} />
    </Routes>
  );
};

export default AppRoutes;
