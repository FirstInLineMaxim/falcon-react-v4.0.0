import Starter from 'components/pages/Starter';
import MaximLanding from 'MaximApp/pages/MaximLanding';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppMainLayout from './AppMainLayout';

export default function MaximLayout() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MaximLanding />} />
        <Route element={<AppMainLayout />}>
          <Route path="weather" element={<Starter />} />
        </Route>
      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
