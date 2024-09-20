import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { useUser } from "../user-context/User-context";

const style = {
  container: `h-screen flex justify-center items-center`,
  button: `px-4 py-2 bg-blue-500 text-white rounded-lg`,
};

const Login = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  
  if (user) {
    navigate("/");
  }

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/"); 
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className={style.container}>
      <button className={style.button} onClick={handleLogin}>
        Login with Google
      </button>
    </div>
  );
};

export default Login;
