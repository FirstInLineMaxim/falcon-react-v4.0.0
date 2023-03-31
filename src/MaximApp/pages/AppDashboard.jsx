import Calendar from 'components/app/calendar/Calendar';
import CalendarProvider from 'MaximApp/providers/CalendarProvider';
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
