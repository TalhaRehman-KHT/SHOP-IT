import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './components/Home.jsx';
import ProductDetails from './components/products/ProductDetails.jsx';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import Profile from './components/User/Profile.jsx';
import UpdateUserProfile from './components/User/UpdateUserProfile.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'; // ✅ Fixed import
import UploadAvatar from './components/User/UploadAvatar.jsx';
import UpdatePassword from './components/User/UpdatePassword.jsx';
import ForgotPassword from './components/auth/ForgotPassword.jsx';
import ResetPassword from './components/auth/ResetPassword.jsx';
import Cart from './components/Cart/Cart.jsx';
import Shipping from './components/Cart/Shipping.jsx';
import ConfirmOrder from './components/Cart/ConfirmOrder.jsx';
import PaymentMethod from './components/Cart/PaymentMethod.jsx';
import MyOrder from './components/order/MyOrder.jsx';
import OrderDetails from './components/order/OrderDetails.jsx';
import Invoice from './components/invoice/invoice.jsx';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Toaster position="top-center" />

        <Header />

        <main className="flex-fill">
          <div className="container py-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/me/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/me/update_profile"
                element={
                  <ProtectedRoute>
                    <UpdateUserProfile />
                  </ProtectedRoute>
                }
              />


              <Route
                path="/me/upload_avatar"
                element={
                  <ProtectedRoute>
                    <UploadAvatar />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/password/update"
                element={
                  <ProtectedRoute>
                    <UpdatePassword />
                  </ProtectedRoute>
                }
              />

              <Route path="/password/forgot" element={<ForgotPassword />} />
              <Route path="/password/reset/:token" element={<ResetPassword />} />

              {/*  */}
              <Route path="/cart" element={<Cart />} />

              {/*  */}
              <Route path="/shipping" element={<ProtectedRoute>
                <Shipping />
              </ProtectedRoute>} />

              <Route path="/confirm_order" element={<ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>} />

              <Route path="/payment_method" element={<ProtectedRoute>
                <PaymentMethod />
              </ProtectedRoute>} />

              <Route path="/me/orders" element={<ProtectedRoute>
                <MyOrder />
              </ProtectedRoute>} />

              <Route path="/me/orders/:id" element={<ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>} />

              <Route path="/invoice/order/:id" element={<ProtectedRoute>
                <Invoice />
              </ProtectedRoute>} />

            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
