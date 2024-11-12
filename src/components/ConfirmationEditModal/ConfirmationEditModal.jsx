import React from "react";
import styles from "./ConfirmationEditModal.module.css";

const ConfirmationEditModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Are you sure?</h2>
                <p>Do you want to edit this student&apos;s details? </p>
                <div className={styles.buttons}>
                    <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
                    <button onClick={onConfirm} className={styles.confirmButton}>Edit</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationEditModal;
