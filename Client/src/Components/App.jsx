import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./Loader.jsx";
import Navbar from "./Navbar.jsx";
import Hero from "./Hero.jsx";
import Footer from "./Footer.jsx";
import AllSneakers from "./AllSneakers.jsx";
import Cart from "./Cart.jsx";
import Contact from "./Contact.jsx";
import HomeProducts from "./HomeProducts.jsx";
import Login from "./Login.jsx";
import About from "./About.jsx";
import React, { useState, useEffect, useRef } from "react";
import { db } from "../Auth/FirebaseAuth";
import { collection, getDocs } from "firebase/firestore";
import Policy from "./Policy.jsx";
import CheckOut from "./CheckOut.jsx";
import AdminPanel from "./AdminPanel.jsx";
import FAQ from "./FAQ.jsx";
import MoveTop from "./MoveTop.jsx";

const App = () => {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loader, setLoader] = useState(true);
  const [review, setReview] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const [totalAmount, setTotalAmount] = useState(
    parseFloat(localStorage.getItem("totalAmount")) || 0
  );

  useEffect(() => {
    const handleStorageChange = () => {
      const storedAmount = parseFloat(localStorage.getItem("totalAmount")) || 0;
      setTotalAmount(storedAmount);
    };

    // Listen to storage updates
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // This lets any component re-sync from localStorage
  const refreshCartFromLocalStorage = () => {
    const updatedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCart(updatedCart);
  };
  const sneakersSectionRef = useRef(null);

  const handleScrollToSneakers = () => {
    sneakersSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedUserEmail = localStorage.getItem("userEmail");
    if (storedUserName) setUserName(storedUserName);
    if (storedUserEmail) setUserEmail(storedUserEmail);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(items);
        // Set only cart items in localStorage
        const storedCart = localStorage.getItem("cartItems");
        const initialCart = storedCart ? JSON.parse(storedCart) : [];
        setCart(initialCart);
        setOriginalProducts(items);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      {loader ? (
        <Loader />
      ) : (
        <div className="scroll-smooth">
          <Navbar
            cart={cart}
            setCart={setCart}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            setUserName={setUserName}
            userName={userName}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero handleScrollToSneakers={handleScrollToSneakers} />
                  {/* <div className="h-[500px]" /> */}
                  <MoveTop />
                  <HomeProducts
                    ref={sneakersSectionRef}
                    products={products}
                    updateProducts={setProducts}
                    resetProducts={() => setProducts(originalProducts)}
                    originalProducts={originalProducts}
                    cart={cart}
                    setCart={setCart}
                    items={products}
                  />
                  <Footer />
                </>
              }
            />
            <Route
              path="/allsneakers"
              element={
                <AllSneakers
                  products={products}
                  updateProducts={setProducts}
                  resetProducts={() => setProducts(originalProducts)}
                  originalProducts={originalProducts}
                  cart={cart}
                  setCart={setCart}
                  items={products}
                />
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />

            <Route
              path="/adminpanel"
              element={
                <AdminPanel
                  items={products}
                  setItems={setProducts}
                  refreshCartFromLocalStorage={refreshCartFromLocalStorage}
                  products={products}
                  setProducts={setProducts}
                  review={review}
                  setReview={setReview}
                  cart={cart}
                />
              }
            />
            <Route
              path="/checkout"
              element={<CheckOut totalAmount={totalAmount} />}
            />
            <Route
              path="/about"
              element={<About review={review} setReviews={setReview} />}
            />
            <Route path="/policy" element={<Policy />} />
            <Route
              path="/login"
              element={
                <Login setUserName={setUserName} setUserEmail={setUserEmail} />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  originalProducts={originalProducts}
                  setCart={setCart}
                  cart={cart}
                  totalAmount={totalAmount}
                />
              }
            />
          </Routes>
        </div>
      )}
    </Router>
  );
};

export default App;
