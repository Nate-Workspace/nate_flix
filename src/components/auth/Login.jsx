import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { googleProvider } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../hero/header/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginWithEmail = async (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser; // This line should be inside the function
    if (currentUser) {
      console.log("User is already logged in");
      window.alert("Already logged in");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      window.alert("Login Sucessfull")
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };
  
  const loginWithGoogle = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      console.log("User is already logged in");
      window.alert("Already logged in");
      return;
    }
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        console.log("Login successful, showing alert");
        window.alert("Login successful");
      }
    } catch (error) {
      console.error("Error with Google login:", error.message);
    }
  };
  

  console.log(auth?.currentUser?.email);

  return (
    <div className="login-wrapper">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Welcome Back!
          </h2>
          <p className="text-center text-gray-600 text-sm mt-2">
            Log in to your account.
          </p>

          <form className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@example.com"
                className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={loginWithEmail}
            >
              Login
            </button>
          </form>

          <div className="mt-6">
            <div className="text-center text-sm text-gray-600">
              Or login with
            </div>
            <button
              type="button"
              onClick={loginWithGoogle}
              className="mt-4 flex items-center justify-center w-full px-4 py-2 border rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              Google
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <a
                href="#"
                className="text-blue-500 font-medium hover:underline"
                onClick={() => navigate(`/signup`)}
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
