"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const Page = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const courseOptions = [
    "Graphic Design",
    "Web Development",
    "Cybersecurity",
    "DevOps",
    "App Development",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const notyf = new Notyf({ position: { x: "right", y: "top" }, duration: 3000 });

    const newCourse = { name, duration };

    try {
      const response = await fetch("http://localhost:3001/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });

      const data = await response.json();

      if (response.ok) {
        notyf.success("Course added successfully!");
        setName("");
        setDuration("");
        router.push("/admindashboard-course");  
      } else {
        notyf.error(`Failed to add course: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      notyf.error("Failed to add course. Please try again.");
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
            <h1>Add Course</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label className={styles.inputStyles1}>Course Name</label>
              <select
                className={styles.inputStyles}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
              >
                <option value="">Select Course</option>
                {courseOptions.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>

              <label className={styles.inputStyles1}>Duration (Months)</label>
              <input
                className={styles.inputStyles}
                type="number"
                placeholder="Duration in months"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                disabled={isLoading}
                required
              />

              <button className={styles.btn} type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
