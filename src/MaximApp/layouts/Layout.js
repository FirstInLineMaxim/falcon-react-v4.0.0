import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

//Components
const AppMainLayout = lazy(() => import('./MainLayout'));
const CreateEvent = lazy(() =>
  import('components/app/events/create-an-event/CreateEvent')
);
const EventDetail = lazy(() =>
  import('components/app/events/event-detail/EventDetail')
);
const Error404 = lazy(() => import('components/errors/Error404'));
const Error500 = lazy(() => import('components/errors/Error500'));
const ErrorLayout = lazy(() => import('layouts/ErrorLayout'));
const Flex = lazy(() => import('components/common/Flex'));

const Crypto = lazy(() => import('MaximApp/pages/Crypto'));
const Weather = lazy(() => import('components/pages/Starter'));
const Calendar = lazy(() =>
  import('../../components/app/calendar/Calendar.js')
);
import { Spinner } from 'react-bootstrap';
import Loader from 'MaximApp/components/Loader';

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
