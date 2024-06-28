import './App.css';
import { Routes,Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home'
import ProductList from './components/ProductList/ProductList'
import ProductDetail from './components/ProductDetail/ProductDetail';
import ProductForm from './components/ProductForm/ProductForm';
import { ToastContainer } from 'react-toastify';
import StoreList from './components/StoreList/StoreList';

function App() {
  const location = useLocation();
  return (
    <>
    <ToastContainer />
      {location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<ProductList/>}/>
        <Route path="/products/:id" element={<ProductDetail/>}/>
        <Route path="/products/create" element={<ProductForm/>}/>
        <Route path="/stores" element={<StoreList/>}/>
      </Routes>
    </>
  );
}

export default App;
