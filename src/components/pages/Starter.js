import { AppNavbar } from '../../MaximApp/components/AppNavbar.jsx';

import WeatherProvider from 'MaximApp/components/WeatherProvider';
import WeatherApp from 'MaximApp/WeatherApp';
import React from 'react';
import NavbarVertical from 'components/navbar/vertical/NavbarVertical.js';

const Starter = () => {
  return (
    <>
      <WeatherProvider>
        <div className={'container-fluid'}>
          <NavbarVertical />
          <div className={'content'}>
            <AppNavbar />

            <WeatherApp />
          </div>
        </div>
      </WeatherProvider>
    </>
  );
};

export default Starter;
