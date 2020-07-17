import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Commenting from "./components/Commenting"

function App() {
  return (
    <Router>
      <Route path="/" exact component={ Commenting } />
    </Router>
  );
}

export default App;
