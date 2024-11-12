'use client';
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import { Notyf } from "notyf";
import 'notyf/notyf.min.css';

const TeacherEditForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialTeacherId = searchParams.get("teacherId") || "";

    const [name, setName] = useState("");
    const [teacherId] = useState(initialTeacherId);
    const [grade, setGrade] = useState("");
    const [course, setCourse] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (teacherId) {
            fetchTeacherData();
        }
    }, [teacherId]);

    const fetchTeacherData = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/teachers/${teacherId}`);
            if (response.ok) {
                const teacherData = await response.json();
                setName(teacherData.name);
                setGrade(teacherData.grade);
                setCourse(teacherData.course);
                setPhone(teacherData.phone);
                setAddress(teacherData.address);
            } else {
                console.error("Failed to load teacher data.");
            }
        } catch (error) {
            console.error("Error fetching teacher data:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const notyf = new Notyf({
            position: { x: "right", y: "top" },
            duration: 3000
        });

        const updatedTeacher = { name, teacherId, grade, course, phone, address };

        try {
            const response = await fetch(`http://localhost:3001/api/teachers/${teacherId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTeacher),
            });

            if (response.ok) {
                notyf.success("Teacher successfully edited!");
                router.push("/admindashboard-teacher");
            } else {
                const data = await response.json();
                notyf.error(`Failed to edit teacher: ${data.error || 'Unknown error'}`);
            }
        } catch (error) {
            notyf.error("Failed to edit teacher. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Edit Teacher</h1>
            <div className={styles.table}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.inputStyles1}>Teacher Name</label>
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
                        disabled={true} 
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
    );
};

const Page = () => {
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
                    <Suspense fallback={<div>Loading...</div>}>
                        <TeacherEditForm />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default Page;
