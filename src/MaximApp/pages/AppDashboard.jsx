import Calendar from 'components/app/calendar/Calendar';
import CalendarProvider from 'MaximApp/components/CalendarProvider';
import React from 'react';

export default function AppDashboard() {
  return (
    <>
      <CalendarProvider>
        <Calendar />
      </CalendarProvider>
    </>
  );
}
