import WeatherProvider from 'MaximApp/components/WeatherProvider';
import WeatherApp from 'MaximApp/WeatherApp';
import React from 'react';
const Starter = () => {
  return (
    <>
      <WeatherProvider>
        <WeatherApp />
      </WeatherProvider>
    </>
  );
};

export default Starter;
