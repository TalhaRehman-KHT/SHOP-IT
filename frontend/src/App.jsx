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

  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Toaster position="top-center" />

        <Header />

        <main className="flex-fill">
          <div className="container py-4">
            <Routes>
              {userRouter}
              {adminRouter}
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
