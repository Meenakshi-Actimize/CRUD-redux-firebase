import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';


function App() {
  return (
    <div className="App">
      <div class="container-fluid bg-dark">
        <h4 class="text-white">CRUD operations</h4>
      </div>
      <Home />
    </div>
  );
}

export default App;
