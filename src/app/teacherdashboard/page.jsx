import React from 'react';
import styles from './page.module.css';

const Page = () => (
    <div className={styles.dashboard}>
        <h2>Teacher Dashboard</h2>
        <div className={styles.grid}>
            <div className={styles.card}>
                <h3>Courses</h3>
                <p>Manage courses, schedules, and classrooms.</p>
            </div>
            <div className={styles.card}>
                <h3>Students</h3>
                <p>Register students, track enrollments, and view performance.</p>
            </div>
            <div className={styles.card}>
                <h3>Instructors</h3>
                <p>Register instructors, assign courses, and access evaluations.</p>
            </div>
            <div className={styles.card}>
                <h3>Reports</h3>
                <p>View trends in enrollment, attendance, and performance.</p>
            </div>
        </div>
    </div>
);

export default Page;
