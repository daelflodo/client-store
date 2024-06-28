import './App.css';
import { Routes,Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home'
import ProductList from './components/ProductList/ProductList'
import ProductDetail from './components/ProductDetail/ProductDetail';

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<ProductList/>}/>
        <Route path="/products/:id" element={<ProductDetail/>}/>
      </Routes>
    </>
  );
}

export default App;
