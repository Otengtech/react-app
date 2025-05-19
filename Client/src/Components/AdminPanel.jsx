import React, { useEffect, useState } from "react";
import { db } from "../Auth/FirebaseAuth";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  limit,
  orderBy,
  startAfter,
} from "firebase/firestore";

const AdminPanel = ({ products, setProducts, cart, review, setReview }) => {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredSneakers, setFilteredSneakers] = useState([]);
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productSize, setProductSize] = useState("");
  const [productSex, setProductSex] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    sex: "",
    size: "",
    image: "",
    price: "",
  });
  const [reviewData, setReviewData] = useState({ name: "", review: "" });
  const [editingId, setEditingId] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const totalProducts = products.length;
  const totalReviews = review.length;
  const totalPrice = cart.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );
  const formattedPrice = totalPrice.toFixed(2);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewURL(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImage(null);
    setPreviewURL(null);
    document.getElementById("image-upload").value = null;
  };

  // Pagination states
  const [sneakerPage, setSneakerPage] = useState(0);
  const sneakersPerPage = 5;

  const [reviewPage, setReviewPage] = useState(0);
  const reviewsPerPage = 3;

  useEffect(() => {
    fetchSneakers();
    fetchReviews();
  }, []);

  const fetchSneakers = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log("Sneakers:", items); // ✅ Debug
    setProducts(items);
    setFilteredSneakers(items);
  };

  const fetchReviews = async () => {
    const snapshot = await getDocs(collection(db, "reviews"));
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log("Reviews:", items); // ✅ Debug
    setReview(items);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = products.filter((s) =>
      s.name.toLowerCase().includes(value)
    );
    setFilteredSneakers(filtered);
    setSneakerPage(0);
  };

  const handleAddSneaker = async () => {
    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", image);

    try {
      // Upload image to backend that uploads to ImgBB
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const imageUrl = data.imageUrl;

      // Store product data to Firestore using state variables
      await addDoc(collection(db, "products"), {
        name: productName,
        price: productPrice,
        size: productSize,
        sex: productSex,
        image: imageUrl,
      });

      alert("Product added successfully");

      // Optionally clear form
      setProductName("");
      setProductPrice("");
      setProductSize("");
      setProductSex("");
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error uploading image or saving product:", error);
      alert("Failed to upload product. Check console for details.");
    }
  };

  const handleUpdateSneaker = async () => {
    const sneakerRef = doc(db, "products", editingId);
    await updateDoc(sneakerRef, formData);
    fetchSneakers();
    setFormData({ name: "", sex: "", size: "", image: "", price: "" });
    setEditingId(null);
  };

  const handleEdit = (sneaker) => {
    setFormData(sneaker);
    setEditingId(sneaker.id);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchSneakers();
  };

  const handleAddReview = async () => {
    // Trim name input for consistency
    const nameToCheck = reviewData.name.trim().toLowerCase();

    // Check if the name already exists
    const q = query(
      collection(db, "reviews"),
      where("name", "==", reviewData.name.trim())
    );

    const existing = await getDocs(q);

    if (!existing.empty) {
      alert("You have already submitted a review.");
      return;
    }

    await addDoc(collection(db, "reviews"), reviewData);
    fetchReviews();
    setReviewData({ name: "", review: "" });
  };

  const handleDeleteReview = async (id) => {
    await deleteDoc(doc(db, "reviews", id));
    fetchReviews();
  };

  const sneakerSlice = filteredSneakers.slice(
    sneakerPage * sneakersPerPage,
    (sneakerPage + 1) * sneakersPerPage
  );

  const reviewSlice = review.slice(
    reviewPage * reviewsPerPage,
    (reviewPage + 1) * reviewsPerPage
  );

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4 text-center">
            Enter Admin PIN
          </h2>
          <input
            type="password"
            placeholder="PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full p-2 placeholder:text-gray-500 border rounded mb-4"
          />
          <button
            onClick={() => {
              pin === "1234" && setIsAuthenticated(true);
              if (pin !== "1234") {
                alert("Incorrect pin");
              }
            }}
            className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-8">
      <h1 className="text-4xl mt-5 font-bold text-yellow-500 text-center">
        Admin Panel
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-gray-100 rounded-2xl shadow-lg max-w-4xl mx-auto my-8">
        {/* Products */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Products</h2>
          <p className="text-3xl font-bold text-yellow-500 mt-2">
            {totalProducts}
          </p>
        </div>

        {/* Reviews */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Reviews</h2>
          <p className="text-3xl font-bold text-yellow-500 mt-2">
            {totalReviews}
          </p>
        </div>

        {/* Total Price */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Price</h2>
          <p className="text-3xl font-bold text-yellow-500 mt-2">
            ₵{formattedPrice}
          </p>
        </div>
      </div>
      {/* Sneaker Form */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-gray-600 text-4xl my-5">Manage Snekers</h1>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Sex"
            value={formData.sex}
            onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Size"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <div className="space-y-4">
            {/* Upload Button */}
            <div>
              <label
                htmlFor="image-upload"
                className="block cursor-pointer bg-white border border-gray-300 text-gray-600 text-center py-3 px-6 rounded-full hover:border-orange-400 hover:text-orange-600 transition"
              >
                Upload Product Image
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Image Preview */}
            {previewURL && (
              <div className="flex flex-col items-center">
                <img
                  src={previewURL}
                  alt="Preview"
                  className="w-48 h-48 object-cover border border-gray-300 rounded-lg shadow-md"
                />
                <button
                  onClick={clearImage}
                  className="mt-2 text-sm text-red-500 hover:text-red-700 underline"
                >
                  Clear Image
                </button>
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <button
            onClick={editingId ? handleUpdateSneaker : handleAddSneaker}
            className="bg-yellow-500 text-white p-2 w-full rounded hover:bg-yellow-400"
          >
            {editingId ? "Update Sneaker" : "Add Sneaker"}
          </button>
        </div>
        {/* Search */}
        <h1 className="text-gray-600 text-4xl my-5">Search Sneaker</h1>
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={handleSearch}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Sneaker List */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-5">
        {sneakerSlice.map((s) => (
          <div
            key={s.id}
            className="border p-4 rounded shadow-md hover:shadow-xl transition-all"
          >
            <img
              src={s.imageUrl}
              alt={s.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h2 className="font-bold text-lg">{s.name}</h2>
            <p>
              Sex: {s.gender} || Size: {s.size} || Type: {s.type} || Price: $
              {s.price}
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(s)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(s.id)}
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sneaker Pagination */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setSneakerPage((prev) => Math.max(prev - 1, 0))}
          className="bg-gray-200 px-4 py-1 rounded"
        >
          Previous
        </button>
        <button
          onClick={() =>
            (sneakerPage + 1) * sneakersPerPage < filteredSneakers.length &&
            setSneakerPage((prev) => prev + 1)
          }
          className="bg-gray-200 px-4 py-1 rounded"
        >
          Next
        </button>
      </div>

      {/* Review Form */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-gray-600 text-4xl my-5">Manage Reviews</h1>
        <div className="space-y-2 w-1/2">
          <input
            type="text"
            placeholder="Reviewer Name"
            value={reviewData.name}
            onChange={(e) =>
              setReviewData({ ...reviewData, name: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Review"
            value={reviewData.review}
            onChange={(e) =>
              setReviewData({ ...reviewData, review: e.target.value })
            }
            className="w-full p-2 border rounded"
          ></textarea>
          <button
            onClick={handleAddReview}
            className="bg-yellow-500 text-white p-2 w-full rounded hover:bg-yellow-400"
          >
            Add Review
          </button>
        </div>
      </div>
      {/* Review List */}
      <div className="space-y-2">
        {reviewSlice.map((r) => (
          <div
            key={r.id}
            className="p-4 border rounded shadow-sm bg-white animate-fadeIn"
          >
            <h3 className="font-semibold">{r.name}</h3>
            <p>{r.message}</p>
            <button
              onClick={() => handleDeleteReview(r.id)}
              className="text-gray-200 text-xs bg-red-500 mt-3 px-4 py-2 rounded-lg "
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Review Pagination */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setReviewPage((prev) => Math.max(prev - 1, 0))}
          className="bg-gray-200 px-4 py-1 rounded"
        >
          Previous
        </button>
        <button
          onClick={() =>
            (reviewPage + 1) * reviewsPerPage < review.length &&
            setReviewPage((prev) => prev + 1)
          }
          className="bg-gray-200 px-4 py-1 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
