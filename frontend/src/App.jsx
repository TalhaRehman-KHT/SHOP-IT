<<<<<<< HEAD
import "./App.css";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import UserRoutes from "./components/Routes/UserRoutes.jsx";
import AdminRoutes from "./components/Routes/AdminRoutes.jsx";

function App() {
  const userRouter = UserRoutes();
  const adminRouter = AdminRoutes();
=======
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './components/Home.jsx';
import ProductDetails from './components/products/ProductDetails.jsx';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';

function App() {
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Toaster position="top-center" />

        <Header />

        <main className="flex-fill">
          <div className="container py-4">
            <Routes>
<<<<<<< HEAD
              {userRouter}
              {adminRouter}
=======
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />


              {/* Add other routes here as needed */}
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
