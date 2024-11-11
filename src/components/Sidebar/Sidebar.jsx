"use client";
import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import Link from 'next/link';

const Sidebar = () => {
    return (
        <div className={styles.main1}>
            <div className={styles.mainLeft}>
                <div className={styles.user}>
                    <div className={styles.title}></div>
                     <h2>School management</h2>
                </div>
                <ul>
                    <Link href={"/admindashboard"}>
                    <li>
                        <i className="fa-solid fa-home" style={{ color: "#000" }}></i>
                        <p>Home</p>
                    </li>
                    </Link>
                    <Link href={"/admindashboard-teacher"}>
                    <li>
                        <i className="fa-solid fa-users" style={{ color: "#000" }}></i>
                        <p>Teachers</p>
                    </li>
                    </Link>
                    <Link href={"/admindashboard-student"}>
                    <li>
                        <i className="fa-solid fa-user-graduate" style={{ color: "#000" }}></i>
                        <p>Students</p>
                    </li>
                    </Link>
                    <Link href={"/admindashboard-course"}>
                    <li>
                        <i className="fa-solid fa-book" style={{ color: "#000" }}></i>
                        <p>Courses</p>
                    </li>
                    </Link>
                    <li>
                        <i className="fa-solid fa-school" style={{ color: "#000" }}></i>
                        <p>Grade</p>
                    </li>
                </ul>
                <ul>
                    <li>
                        <i className="fa-regular fa-user" style={{ color: "#000" }}></i>
                        <p>Profile</p>
                    </li>
                    <li>
                        <i className="fa-solid fa-gear" style={{ color: "#000" }}></i>
                        <p>Settings</p>
                    </li>
                    <li className={styles.logout}>
                        <i className="fa-solid fa-right-from-bracket" style={{ color: "red" }}></i>
                        <p style={{ color: "red" }}>Log out</p>
                    </li>
                </ul>
            </div>
            </div>
    );
};

export default Sidebar;
