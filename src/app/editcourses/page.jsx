'use client';
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const CourseEditForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id");

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

  useEffect(() => {
    if (courseId) fetchCourseDetails();
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/courses/${courseId}`);
      setName(response.data.name);
      setDuration(response.data.duration);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const notyf = new Notyf({ position: { x: "right", y: "top" }, duration: 3000 });

    const updatedCourse = { name, duration };

    try {
      const response = await axios.put(`http://localhost:3001/api/courses/${courseId}`, updatedCourse);

      if (response.status === 200) {
        notyf.success("Course updated successfully!");
        router.push("/admindashboard-course");
      } else {
        notyf.error("Failed to update course. Please try again.");
      }
    } catch (error) {
      notyf.error("Failed to update course. Please try again.");
      console.error("Error updating course:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Edit Course</h1>
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
          {isLoading ? "Updating..." : "Update"}
        </button>
      </form>
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
            <CourseEditForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
