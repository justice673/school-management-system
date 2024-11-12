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
  const [teachers, setTeachers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("https://school-management-system-backend-jzrj.onrender.com/api/teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const openModal = (teacherId) => {
    setSelectedTeacher(teacherId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTeacher(null);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://school-management-system-backend-jzrj.onrender.com/api/teachers/${selectedTeacher}`);
      setTeachers(teachers.filter((teacher) => teacher._id !== selectedTeacher));
      closeModal();
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  const openEditModal = (teacher) => {
    setSelectedTeacher(teacher);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTeacher(null);
  };

  const confirmEdit = () => {
    router.push(`/editteachers?id=${selectedTeacher._id}`);
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
            <h1>All Teachers</h1>
            <div className={styles.searchContainer}>
              <Link href={"/addteachers"}>
                <i className="fas fa-plus-circle"></i>
              </Link>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Info</th>
                  <th>Teacher ID</th>
                  <th>Grade</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher._id}>
                    <td className={styles.info}>
                      {teacher.name} <span>{teacher.gradeSection}</span>
                    </td>
                    <td>{teacher.teacherId}</td>
                    <td>{teacher.grade}</td>
                    <td>{teacher.phone}</td>
                    <td>{teacher.address}</td>
                    <td className={styles.actions}>
                      <i
                        className="fas fa-edit"
                        style={{ color: "green", cursor: "pointer" }}
                        onClick={() => openEditModal(teacher)}
                      ></i>
                      <i
                        className="fas fa-trash-alt"
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => openModal(teacher._id)}
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
