import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.min.css';
import Layout from './layouts/Layout';
import MaximLayout from 'MaximApp/layouts/MaximLayout';

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      {/* <Layout /> */}
      <MaximLayout />
    </Router>
  );
};

export default App;
