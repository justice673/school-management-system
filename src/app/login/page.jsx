"use client";
import React, { useState } from "react";
import style from './page.module.css';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Initialize Notyf instance
  const notyf = new Notyf();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch("https://school-management-system-backend-jzrj.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
          notyf.success("Login successful!");
          router.push("/admindashboard");
        }
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
        notyf.error(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An error occurred. Please try again later.");
      notyf.error("An error occurred. Please try again later.");
    }
  };

  return (
    <section className={style.form}>
      <div className={style.left}></div>
      <div className={style.right}>
        <div className={style.con}>
          <h2>Login</h2>
          <p>Welcome Back</p>
          <form onSubmit={handleSubmit}>
            <div className={style.inputContainer}>
              <i className="fa-regular fa-envelope" aria-hidden="true"></i>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={style.inputContainer}>
              <i className="fa fa-lock" aria-hidden="true"></i>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i
                className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                aria-hidden="true"
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            <button type="submit">Login</button>
            {error && <p className={style.error}>{error}</p>}
          </form>
          <div className={style.forgot}>
            <Link href={"/forgotpassword"}>Forgot Password?</Link>
          </div>
          <div className={style.bot}>
            <p>Or login with</p>
            <div className={style.exist}>
              <p>Don&#39;t have an account yet?</p>
              <Link href={"/register"}>Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
