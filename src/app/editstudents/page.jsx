"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import { Notyf } from "notyf";
import 'notyf/notyf.min.css';

const Page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const studentId = searchParams.get("id");

    const [name, setName] = useState("");
    const [grade, setGrade] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
    if (studentId) {
        fetchStudentData();
    } else {
        console.error("Student ID is null or undefined.");
    }
}, [studentId]);


    const fetchStudentData = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/students/${studentId}`);
            if (response.ok) {
                const studentData = await response.json();
                setName(studentData.name);
                setGrade(studentData.grade);
                setPhone(studentData.phone);
                setAddress(studentData.address);
            } else {
                console.error("Failed to load student data.");
            }
        } catch (error) {
            console.error("Error fetching student data:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const notyf = new Notyf({
            position: { x: "right", y: "top" },
            duration: 3000
        });

        const updatedStudent = { name, grade, phone, address };

        try {
            const response = await fetch(`http://localhost:3001/api/students/${studentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedStudent),
            });

            if (response.ok) {
                notyf.success("Student successfully edited!");
                router.push("/admindashboard-student");
            } else {
                const data = await response.json();
                notyf.error(`Failed to edit student: ${data.error || 'Unknown error'}`);
            }
        } catch (error) {
            notyf.error("Failed to edit student. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.mainLeft}>
                <Sidebar />
            </div>
            <div className={styles.mainRight}>
                <div className={styles.navbar}>
                    <Navbar />
                </div>
                <div className={styles.mainRight1}>
                    <div className={styles.container}>
                        <h1>Edit Student</h1>
                        <div className={styles.table}>
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <label className={styles.inputStyles1}>Student Name</label>
                                <input
                                    className={styles.inputStyles}
                                    type="text"
                                    placeholder="Student name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={isLoading}
                                    required
                                />
                                <label className={styles.inputStyles1}>Grade</label>
                                <input
                                    className={styles.inputStyles}
                                    type="text"
                                    placeholder="Grade"
                                    value={grade}
                                    onChange={(e) => setGrade(e.target.value)}
                                    disabled={isLoading}
                                    required
                                />
                                <label className={styles.inputStyles1}>Phone</label>
                                <input
                                    className={styles.inputStyles}
                                    type="number"
                                    placeholder="Phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    disabled={isLoading}
                                    required
                                />
                                <label className={styles.inputStyles1}>Address</label>
                                <input
                                    className={styles.inputStyles}
                                    type="text"
                                    placeholder="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    disabled={isLoading}
                                    required
                                />
                                <button className={styles.btn} type="submit" disabled={isLoading}>
                                    {isLoading ? 'Submitting...' : 'Submit'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
