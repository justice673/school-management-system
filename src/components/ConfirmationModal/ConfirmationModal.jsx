import React from "react";
import styles from "./ConfirmationModal.module.css";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Are you sure?</h2>
                <p>Do you want to permanently delete this student? </p>
                <div className={styles.buttons}>
                    <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
                    <button onClick={onConfirm} className={styles.confirmButton}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
