import logo from './logo.svg';
import './App.css';
import { Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

function App() {
  const location = useLocation();
  return (
    <>
    {location.pathname!== '/' && <Navbar />}
    <Routes>

    </Routes>
    </>
  );
}

export default App;
