import toast from 'react-hot-toast';

const defaultOoptions = {
  style: {
    background: '#333',
    color: '#fff',
  },
};

const toaster = {
  success: (message: string, options?: any) => {
    toast.success(message, {
      ...defaultOoptions,
      ...options,
    });
  },
};

export default toaster;
