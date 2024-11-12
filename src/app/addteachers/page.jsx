"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import { Notyf } from "notyf";
import 'notyf/notyf.min.css';

const Page = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [teacherId, setTeacherId] = useState("");
    const [grade, setGrade] = useState("");
    const [course, setCourse] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const notyf = new Notyf({
            position: { x: "right", y: "top" },
            duration: 3000
        });

        const newTeacher = { name, teacherId, grade, course, phone, address };

        try {
            const response = await fetch('https://school-management-system-backend-jzrj.onrender.com/api/teachers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTeacher),
            });

            const data = await response.json();

            if (response.ok) {
                notyf.success("Teacher added successfully!");
                setName('');
                setTeacherId('');
                setGrade('');
                setCourse('');
                setPhone('');
                setAddress('');

                router.push("/admindashboard-teacher");
            } else {
                notyf.error(`Failed to add teacher: ${data.error || 'Unknown error'}`);
            }
        } catch (error) {
            notyf.error("Failed to add teacher. Please try again.");
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
                        <h1>Add Teacher</h1>
                        <div className={styles.table}>
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <label className={styles.inputStyles1}>Student Name</label>
                                <input
                                    className={styles.inputStyles}
                                    type="text"
                                    placeholder="Teacher name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={isLoading}
                                    required
                                />
                                <label className={styles.inputStyles1}>Teacher ID</label>
                                <input
                                    className={styles.inputStyles}
                                    type="text"
                                    placeholder="Teacher ID"
                                    value={teacherId}
                                    onChange={(e) => setTeacherId(e.target.value)}
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
                                <label className={styles.inputStyles1}>Course</label>
                                <input
                                    className={styles.inputStyles}
                                    type="text"
                                    placeholder="Course"
                                    value={course}
                                    onChange={(e) => setCourse(e.target.value)}
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
