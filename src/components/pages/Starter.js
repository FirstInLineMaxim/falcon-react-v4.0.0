import { AppNavbar } from '../../MaximApp/components/AppNavbar.jsx';

import WeatherProvider from 'MaximApp/components/WeatherProvider';
import WeatherApp from 'MaximApp/WeatherApp';
import React from 'react';
import AppNavbarVertical from 'MaximApp/components/AppNavbarVertical.js';

const Starter = () => {
  return (
    <>
      <WeatherProvider>
        <div className={'container-fluid'}>
          <AppNavbarVertical />
          <div className={'content'}>
            <WeatherApp />
          </div>
        </div>
      </WeatherProvider>
    </>
  );
};

export default Starter;
