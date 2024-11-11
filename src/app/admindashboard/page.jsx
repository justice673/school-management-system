// "use client";
import React from "react";
import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";

export default function page() {
  return (
    <div className={styles.main}>
      <div className={styles.mainLeft}>
        <Sidebar />
      </div>
      <div className={styles.mainRight}>
        <Navbar />
        <div className={styles.mainRight1}>
          <div className={styles.right1}>
            <h1>2</h1>
            <p>Admins</p>
          </div>
          <div className={styles.right2}>
            <h1>24</h1>
            <p>Teachers</p>
          </div>
          <div className={styles.right3}>
            <h1>200</h1>
            <p>Students</p>
          </div>
        </div>
        <div className={styles.mainRight2}>
          <div className={styles.right4}>
            <h1>Students</h1>
            <Image src={"/ERVnG-removebg-preview.png"} width={1000} height={1000} alt=""/>
      </div>
          <div className={styles.right5}>
            <h1>Attendance</h1>
            <Image src={"/bar-graph.webp"} width={1000} height={1000} alt=""/>
      </div>
      </div>
      </div>
    </div>
  );
}
