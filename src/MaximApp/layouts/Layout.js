import CreateEvent from 'components/app/events/create-an-event/CreateEvent';
import EventDetail from 'components/app/events/event-detail/EventDetail';
import Error404 from 'components/errors/Error404';
import Error500 from 'components/errors/Error500';
import Starter from 'components/pages/Starter';
import ErrorLayout from 'layouts/ErrorLayout';
import AppDashboard from 'MaximApp/pages/AppDashboard';
import Crypto from 'MaximApp/pages/Crypto';
import MaximLanding from 'MaximApp/pages/MaximLanding';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppMainLayout from './MainLayout';

export default function MaximLayout() {
  return (
    <>
      <Routes>
        {/* <Route exact path="/" element={<MaximLanding />} /> */}
        <Route path="/" element={<AppMainLayout />}>
          <Route path="weather" element={<Starter />} />
          <Route path="dashboard" element={<AppDashboard />} />
          <Route path="events/create-an-event" element={<CreateEvent />} />
          <Route path="events/event-detail" element={<EventDetail />} />
          <Route path="crypto" element={<Crypto />} />
        </Route>
        <Route element={<ErrorLayout />}>
          <Route path="errors/404" element={<Error404 />} />
          <Route path="errors/500" element={<Error500 />} />
        </Route>
        <Route path="*" element={<Navigate to="/errors/404" replace />} />
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
