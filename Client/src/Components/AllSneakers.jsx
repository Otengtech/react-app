import { useState, useEffect } from "react";
import Loader from "./Loader";
import Footer from "./Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllSneakers = ({
  products,
  updateProducts,
  resetProducts,
  originalProducts,
  cart,
  setCart,
}) => {
  const [input, setInput] = useState("");
  const [loader, setLoader] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const handleImageClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const addToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      toast.info("Item already in cart!", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    } else {
      setCart([...cart, product]);
      toast.success(`${product.name} added to cart! 🛒`, {
        position: "top-right",
        theme: "dark",
        autoClose: 1000,
      });
    }
  };

  const showProducts = () => {
    setLoader(true);
    setCurrentPage(1);
    const trimmedInput = input.trim();
    if (trimmedInput !== "") {
      setTimeout(() => {
        const filtered = originalProducts.filter((item) =>
          item.name.toLowerCase().includes(trimmedInput.toLowerCase())
        );
        if (filtered.length > 0) {
          updateProducts(filtered);
          toast.success("Products filtered successfully! ✅", {
            position: "top-right",
            autoClose: 1000,
          });
        } else {
          toast.error("No matching products found.", {
            position: "top-right",
            autoClose: 1000,
          });
          resetProducts();
        }
        setLoader(false);
      }, 1000);
    } else {
      toast.warn("Please enter a valid product name.", {
        position: "top-right",
        autoClose: 1000,
      });
      setLoader(false);
      resetProducts();
    }
    setInput("");
  };

  const filterByEnterKey = (event) => {
    if (event.key === "Enter") {
      showProducts();
    }
  };

  const viewAllSneakers = () => {
    setLoader(true);
    setCurrentPage(1);
    setTimeout(() => {
      setLoader(false);
      toast.success("Showing all sneakers!", {
        position: "top-right",
        autoClose: 1000,
      });
    }, 1000);
    resetProducts();
  };

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <>
      <ToastContainer />
      {loader && <Loader />}

      {!loader && (
        <div>
          {/* Header */}
          <div className="bg-gradient-to-r from-lime-300 via-yellow-200 to-yellow-400 py-24 px-6 text-center relative overflow-hidden">
            <h1 className="text-black drop-shadow-lg font-bold mb-5 text-center text-5xl sm:text-5xl lg:text-6xl">
              VIEW ALL SNEAKERS
            </h1>
            <p className="text-gray-800 text-centerm mb-5 text-lg sm:text-xl">
              Get all our sneaker collections here... search for preferred
              sneaker brands.
            </p>

            {/* Search */}
            <div className="relative flex justify-center items-center w-full max-w-lg mx-auto">
              <input
                onChange={handleInput}
                onKeyDown={filterByEnterKey}
                value={input}
                className="w-full bg-transparent text-gray-800 px-6 py-4 rounded-full border border-gray-800 focus:outline-none placeholder:text-gray-800"
                type="search"
                placeholder="Search for sneakers..."
              />
              <i
                onClick={showProducts}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-xl text-gray-800 fa-solid fa-magnifying-glass cursor-pointer"
              ></i>
            </div>
          </div>

          {/* Sneakers Section */}
          <div className="w-full px-6 bg-gray-900 sm:px-10 md:px-20 lg:px-32 pb-32 pt-10 mx-auto text-center space-y-8">
            <button
              onClick={viewAllSneakers}
              className="bg-yellow-500 text-black text-md px-6 py-4 rounded-full transition"
            >
              VIEW ALL SNEAKERS
            </button>
            <p className="text-gray-200 block text-xl">
              Searched sneakers will be displayed here...
            </p>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {currentProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-row block bg-white rounded-2xl overflow-hidden transition hover:scale-[1.02] duration-300"
                >
                  <div className="w-full block relative md:w-1/2 bg-gray-100 flex items-center justify-center">
                    <img
                      onClick={() => handleImageClick(item)}
                      src={
                        item.img?.startsWith("http")
                          ? item.img
                          : item.imageUrl || "https://via.placeholder.com/150"
                      }
                      alt={item.name}
                      className="w-40 h-40 block md:w-full md:h-full lg:w-full lg:h-full object-cover cursor-pointer"
                    />
                    
                  </div>

                  <div className="w-full md:w-1/2 bg-gray-700 py-10 px-4 flex flex-col items-center justify-between">
                    <div>
                      <h2 className="text-sm block md:text-xl font-semibold text-gray-200">
                        {item.name}
                      </h2>
                      <p className="text-sm text-gray-200 mt-1 capitalize">
                        {item.type} • {item.gender}
                      </p>
                    </div>
                    <div>
                      <div className="flex block justify-center text-yellow-500 space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className="fa-solid fa-star text-yellow-400"
                          />
                        ))}
                      </div>
                      <div className="flex flex-wrap justify-center gap-3 mt-4">
                        <span className="bg-gray-200 block text-xs text-gray-800 px-6 py-2 rounded-full">
                          Size: {item.size}
                        </span>
                        <span className="text-sm md:text-lg font-bold text-gray-200">
                          GH<i className="fa-solid fa-cedi-sign"></i>{" "}
                          {Number(item?.price ?? 0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => addToCart(item)}
                        className="flex items-center gap-2 px-6 py-4 bg-yellow-500 text-black text-xs mt-2 md:text-md rounded-full hover:bg-yellow-400 transition"
                      >
                        <i className="fa-solid fa-bag-shopping"></i> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex block justify-center mt-6 gap-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-full ${
                      currentPage === index + 1
                        ? "bg-yellow-500 text-black"
                        : "bg-gray-200 text-black"
                    } hover:bg-yellow-400 transition`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}

            {/* Modal */}
            {selectedProduct && (
              <div className="fixed block inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl max-w-3xl w-full shadow-lg relative overflow-y-auto max-h-[90vh]">
                  <button
                    onClick={closeModal}
                    className="absolute right-6 top-4"
                  >
                    <i className="text-3xl text-yellow-500 fa-solid fa-circle-xmark"></i>
                  </button>
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center">
                      <img
                        src={
                          selectedProduct.img?.startsWith("http")
                            ? selectedProduct.img
                            : selectedProduct.imageUrl ||
                              "https://via.placeholder.com/150"
                        }
                        alt={selectedProduct.name}
                        className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-t-none"
                      />
                    </div>
                    <div className="w-full flex flex-col items-center justify-center md:w-1/2 p-6">
                      <h2 className="text-2xl font-bold text-gray-800">
                        {selectedProduct.name}
                      </h2>
                      <p className="text-gray-500 mt-1 capitalize">
                        {selectedProduct.type} • {selectedProduct.gender}
                      </p>
                      <span className="bg-gray-200 text-xs text-gray-700 px-6 py-1 rounded-full">
                        Size: {selectedProduct.size}
                      </span>
                      <div className="mt-4 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="fa-solid fa-star" />
                        ))}
                      </div>
                      <p className="mt-4 text-gray-600">
                        {selectedProduct.description ||
                          "No description available."}
                      </p>
                      <div className="mt-4 text-lg font-bold text-gray-800">
                        GH<i className="fa-solid fa-cedi-sign"></i>{" "}
                        {(selectedProduct.price || 0).toFixed(2)}
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={() => {
                            addToCart(selectedProduct);
                            closeModal();
                          }}
                          className="px-5 py-2 bg-yellow-500 text-black rounded-full hover:bg-yellow-400 transition"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default AllSneakers;
