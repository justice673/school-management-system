"use client";
import React, { useState } from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";
// import Sidebar from "../Sidebar/Sidebar";

const Navbar = () => {
  return (
    <div className={styles.full}>
     
      <div className={styles.topnav}>
        <div className={styles.main}>
          <div className={styles.left}>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search..."
            />
          </div>
          <div className={styles.right}>
            <i className="fa-regular fa-bell"></i>
            <div className={styles.profile}>
              <Image src="/IMG-20240513-WA0029.jpg" alt="" width={1000} height={1000} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
