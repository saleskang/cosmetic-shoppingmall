import { Routes, Route } from 'react-router-dom';
import './App.css'
import './styles/main.css';

import Header from './components/Header';
import MainImage from './components/MainImage';
import ProductList from './components/ProductList';
import Story from './components/Story';
import Life from './components/Life';
import Space from './components/Space';
import Footer from './components/Footer';
import Shop from './pages/Shop';
import CallbackPage from "./pages/CallbackPage";

// 홈페이지 컴포넌트
const HomePage = () => {
  return (
    <>
      <div className="relative">
        <Header/>
        <MainImage/>
      </div>
      <ProductList/>
      <ProductList/>
      <Story/>
      <Life/>
      <Space/>
      <Footer/>
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/callback" element={<CallbackPage />} />

    </Routes>
  );
}

export default App
