import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Auth/FirebaseAuth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setUserName, setUserEmail }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  };

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields", { autoClose: 1000 });
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast.error("Passwords do not match", { autoClose: 1000 });
      return;
    }

    if (!isLogin && !validatePassword(password)) {
      toast.error(
        "Password must be at least 6 characters, with an uppercase letter, a number, and a symbol.",
        { autoClose: 2000 }
      );
      return;
    }

    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        toast.success("Login successful!", { autoClose: 1000 });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        toast.success("SignUp successful!", { autoClose: 1000 });
        setIsLogin(true);
        setPassword("");
        setConfirmPassword("");
        setSignupName("");
        return;
      }

      const user = userCredential.user;
      const userName = isLogin
        ? user.displayName || email.split("@")[0]
        : signupName;

      setUserName(userName);
      setUserEmail(user.email);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userEmail", user.email);

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use. Try another email.", {
          autoClose: 2000,
        });
      } else if (error.code === "auth/user-not-found") {
        toast.error("No account found. Please sign up.", { autoClose: 2000 });
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password. Try again.", { autoClose: 1000 });
      } else {
        toast.error("No account found. Please try again.", { autoClose: 1000 });
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="p-4 bg-gray-900 w-full h-[100vh] flex items-center justify-center">
        <div className="p-8 md:p-12 rounded-xl w-full max-w-xl">
          <div className="text-center">
            <div className="md:text-5xl sm:text-5xl text-4xl font-bold text-gray-200">
              {isLogin ? "LOG INTO YOUR ACCOUNT" : "CREATE A NEW ACCOUNT"}
            </div>
            <p className="text-yellow-500 text-xl mt-2">
              {isLogin
                ? "Login to access your account."
                : "Sign up to access our services."}
            </p>
          </div>
          <form onSubmit={handleAuth} className="space-y-4 mt-4">
            {!isLogin && (
              <div className="flex bg-white border border-gray-400 items-center py-3 px-6 rounded-full">
                <i className="fa-solid fa-user text-lg mr-3 text-yellow-500"></i>
                <input
                  required
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="w-full bg-transparent focus:outline-none placeholder:text-gray-600"
                  type="text"
                  placeholder="Enter name"
                />
              </div>
            )}
            <div className="flex bg-white border border-gray-400 items-center py-3 px-6 rounded-full">
              <i className="fa-solid fa-envelope text-lg mr-3 text-yellow-500"></i>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent focus:outline-none placeholder:text-gray-600"
                type="email"
                placeholder="Enter email"
              />
            </div>
            <div className="flex bg-white border border-gray-400 items-center py-3 px-6 rounded-full relative">
              <i className="fa-solid fa-lock text-lg mr-3 text-yellow-500"></i>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent focus:outline-none placeholder:text-gray-600"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
              />
              <i
                onClick={() => setShowPassword(!showPassword)}
                className={`text-gray-700 cursor-pointer fa-solid ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </div>
            {!isLogin && (
              <div className="flex bg-white border border-gray-400 items-center py-3 px-6 rounded-full relative">
                <i className="fa-solid fa-lock text-lg mr-3 text-yellow-500"></i>
                <input
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent focus:outline-none placeholder:text-gray-600"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                />
                <i
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`text-gray-700 cursor-pointer fa-solid ${
                    showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </div>
            )}
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 px-6 rounded-full transition duration-300"
              >
                {isLogin ? "LOGIN" : "CREATE ACCOUNT"}
              </button>
            </div>
            <p className="text-center text-gray-500 mt-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="underline text-blue-500 cursor-pointer hover:text-blue-400"
              >
                {isLogin ? "Create account" : "Login"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
