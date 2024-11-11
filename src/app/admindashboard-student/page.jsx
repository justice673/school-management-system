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

export default function Page() {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const openModal = (studentId) => {
    setSelectedStudent(studentId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/students/${selectedStudent}`);
      setStudents(students.filter((student) => student._id !== selectedStudent));
      closeModal();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedStudent(null);
  };

  const confirmEdit = () => {
    router.push(`/editstudents?id=${selectedStudent._id}`);
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
            <h1>All Students</h1>
            <div className={styles.searchContainer}>
              <Link href={"/addstudents"}>
                <i className="fas fa-plus-circle"></i>
              </Link>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Info</th>
                  <th>Student ID</th>
                  <th>Grade</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Enroll Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td className={styles.info}>
                      {student.name} <span>{student.gradeSection}</span>
                    </td>
                    <td>{student.studentId}</td>
                    <td>{student.grade}</td>
                    <td>{student.phone}</td>
                    <td>{student.address}</td>
                    <td>{student.email}</td>
                    <td>{student.course}</td>
                    <td>{new Date(student.enrollDate).toLocaleDateString()}</td>
                    <td className={styles.actions}>
                      <i
                        className="fas fa-edit"
                        style={{ color: "green", cursor: "pointer" }}
                        onClick={() => openEditModal(student)}
                      ></i>
                      <i
                        className="fas fa-trash-alt"
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => openModal(student._id)}
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
}
