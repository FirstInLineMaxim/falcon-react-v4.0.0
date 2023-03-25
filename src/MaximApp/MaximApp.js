import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MaximLayout from './layouts/MaximLayout';

export default function MaximApp() {
  return (
    <Router basename="/">
      <MaximLayout />
    </Router>
  );
}
