import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login.jsx";
import Navbar from "./component/Navbar.jsx";
import Home from "./pages/Home.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import  ProductProvider from "./provider/ProductProvider.jsx";
import Footer from "./component/Footer.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ProductProvider>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
