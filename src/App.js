import './App.css';
import { Routes,Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home'
import ProductList from './components/ProductList/ProductList'
import ProductDetail from './components/ProductDetail/ProductDetail';
import ProductForm from './components/ProductForm/ProductForm';
import { ToastContainer } from 'react-toastify';
import StoreList from './components/StoreList/StoreList';
import StoreDetail from './components/StoreDetail/StoreDetail';
import StoreForm from './components/StoreForm/StoreForm';
import Login from './components/Login/Login';
import RegisterUser from './components/RegisterUser/RegisterUser';

function App() {
  const location = useLocation();
  return (
    <>
    <ToastContainer />
      {location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/products" element={<ProductList/>}/>
        <Route path="/products/:id" element={<ProductDetail/>}/>
        <Route path="/products/create" element={<ProductForm/>}/>
        <Route path="/stores" element={<StoreList/>}/>
        <Route path="/stores/:id" element={<StoreDetail/>}/>
        <Route path="/stores/create" element={<StoreForm/>}/>
      </Routes>
    </>
  );
}

export default App;
