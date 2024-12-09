import React, { useState, useRef } from "react";

const CustomToast = ({ message, show, setShow }) => {
    const toastRef = useRef();

    // Hàm ẩn Toast
    const hideToast = () => {
        setShow(false);
    };

    return (
        <div
            ref={toastRef}
            className={`toast position-fixed bottom-0 end-0 m-3 ${show ? "show" : ""}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={{ zIndex: 9999 }}
        >
            <div className="toast-header">
                <strong className="me-auto">Notification</strong>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                    onClick={hideToast}
                ></button>
            </div>
            <div className="toast-body">{message}</div>
        </div>
    );
};

export default CustomToast;
