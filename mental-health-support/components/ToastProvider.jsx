'use client';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </>
  );
};

// Custom toast functions
export const showToast = {
  success: (message, options = {}) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      ...options,
    });
  },
  
  error: (message, options = {}) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      ...options,
    });
  },
  
  info: (message, options = {}) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      ...options,
    });
  },
  
  warning: (message, options = {}) => {
    toast.warn(message, {
      position: "top-right",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      ...options,
    });
  },
  
  promise: async (promise, messages) => {
    return toast.promise(promise, {
      pending: messages.pending || 'Processing...',
      success: messages.success || 'Success!',
      error: messages.error || 'Something went wrong!',
    });
  }
};

export default ToastProvider;