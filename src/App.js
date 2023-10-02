import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Regression from './components/Regression';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route 
            path='/stock-dashboard'
            element={<Dashboard />}
          />
          <Route 
            path='/regression'
            element={<Regression />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
