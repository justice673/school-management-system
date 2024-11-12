"use client";
import React, { useState } from "react";
import style from './page.module.css';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("https://school-management-system-backend-jzrj.onrender.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          first_name: firstName,
          last_name: lastName,
          email,
          username: userName,
          password,
          password_confirm: confirmPassword,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        notyf.success("Registration successful!");
        router.push("/login");
      } else {
        setError(result.message || "Registration failed. Please try again.");
        notyf.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("Something went wrong. Please try again later.");
      notyf.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <section className={style.form}>
      <div className={style.left}></div>
      <div className={style.right}>
        <div className={style.con}>
          <h2>Hello!</h2>
          <p>Sign up and get started</p>
          <form onSubmit={handleSubmit}>
            <div className={style.inputContainer}>
              <i className="fa fa-user" aria-hidden="true"></i>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className={style.inputContainer}>
              <i className="fa fa-user" aria-hidden="true"></i>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className={style.inputContainer}>
              <i className="fa fa-user" aria-hidden="true"></i>
              <input
                type="text"
                placeholder="User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className={style.inputContainer}>
              <i className="fa fa-envelope" aria-hidden="true"></i>
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
                style={{ cursor: "pointer" }}
              ></i>
            </div>
            <div className={style.inputContainer}>
              <i className="fa fa-lock" aria-hidden="true"></i>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <i
                className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                aria-hidden="true"
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
            <button type="submit">Register</button>
            {error && <p className={style.error}>{error}</p>}
          </form>
          <div className={style.bot}>
            <p>Or sign up with</p>
            <div className={style.exist}>
              <p>Do you have an account already?</p>
              <Link href={"/login"}>Login</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
