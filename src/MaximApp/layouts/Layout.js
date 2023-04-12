import CreateEvent from 'components/app/events/create-an-event/CreateEvent';
import EventDetail from 'components/app/events/event-detail/EventDetail';
import Error404 from 'components/errors/Error404';
import Error500 from 'components/errors/Error500';
// import Starter from 'components/pages/Starter';
import ErrorLayout from 'layouts/ErrorLayout';
// import AppDashboard from 'MaximApp/pages/AppDashboard';
// import Crypto from 'MaximApp/pages/Crypto';
import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppMainLayout from './MainLayout';
import { Spinner } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import Loader from 'MaximApp/components/Loader';

const Crypto = lazy(() => import('MaximApp/pages/Crypto'));
const Weather = lazy(() => import('components/pages/Starter'));
const Calendar = lazy(() => import('MaximApp/pages/AppDashboard'));
export default function MaximLayout() {
  return (
    <>
      <Suspense
        fallback={
          <Flex
            justifyContent={'center'}
            alignItems={'center'}
            style={{ height: '94vh' }}
          >
            <Spinner />
          </Flex>
        }
      >
        <Routes>
          <Route path="/" element={<AppMainLayout />}>
            <Route path="weather" element={<Weather />} />
            <Route path="dashboard" element={<Calendar />} />
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
      </Suspense>
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
