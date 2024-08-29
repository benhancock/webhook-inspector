import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Frontpage from './Components/Frontpage';
import URLEndpointPage from './Components/URLEndpointPage';

function App() {
  return (

    <Router>
      <Routes>
        <Route
          path="/"
          element={<Frontpage />}
        />
        <Route
          path="/:url_endpoint"
          element={<URLEndpointPage />}
        />
      </Routes>
    </Router>
  )
}

export default App
