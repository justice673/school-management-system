"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import ConfirmationEditModal from "@/components/ConfirmationEditModal/ConfirmationEditModal";

const Page = () => {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("https://school-management-system-backend-jzrj.onrender.com/api/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const openModal = (courseId) => {
    setSelectedCourse(courseId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://school-management-system-backend-jzrj.onrender.com/api/courses/${selectedCourse}`);
      setCourses(courses.filter((course) => course._id !== selectedCourse));
      closeModal();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const openEditModal = (course) => {
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCourse(null);
  };

  const confirmEdit = () => {
    router.push(`/editcourses?id=${selectedCourse._id}`);
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
            <h1>All Courses</h1>
            <div className={styles.searchContainer}>
              <Link href={"/addcourses"}>
                <i className="fas fa-plus-circle"></i>
              </Link>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Duration (Months)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td>{course.name}</td>
                    <td>{course.duration}</td>
                    <td className={styles.actions}>
                      <i
                        className="fas fa-edit"
                        style={{ color: "green", cursor: "pointer" }}
                        onClick={() => openEditModal(course)}
                      ></i>
                      <i
                        className="fas fa-trash-alt"
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => openModal(course._id)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
      <ConfirmationEditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onConfirm={confirmEdit}
      />
    </div>
  );
};

export default Page;
