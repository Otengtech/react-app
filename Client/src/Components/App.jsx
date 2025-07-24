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
import ScrollToTop from "./ScrollToTop.jsx";
import Gallery from "./Gallery.jsx";

const App = () => {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loader, setLoader] = useState(true);
  const [review, setReview] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  // ✅ Initialize cart from localStorage
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // ✅ Sync cart to localStorage and compute totalAmount
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));

    const total = cart.reduce(
      (acc, item) => acc + Number(item.price || 0) * (item.quantity || 1),
      0
    );
    setTotalAmount(total);
    localStorage.setItem("totalAmount", total.toFixed(2));
  }, [cart]);

  const refreshCartFromLocalStorage = () => {
    const updatedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCart(updatedCart);
  };

  const sneakersSectionRef = useRef(null);
  const handleScrollToSneakers = () => {
    sneakersSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Load username/email from localStorage
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedUserEmail = localStorage.getItem("userEmail");
    if (storedUserName) setUserName(storedUserName);
    if (storedUserEmail) setUserEmail(storedUserEmail);
  }, []);

  // Load products from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(items);
        setOriginalProducts(items);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  // Loader
  useEffect(() => {
    const timer = setTimeout(() => setLoader(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loader ? (
        <Loader />
      ) : (
        <div className="scroll-smooth">
          <ScrollToTop />
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
            <Route path="gallery" element={<Gallery />} />
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
