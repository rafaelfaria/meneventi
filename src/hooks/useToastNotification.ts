import { toast, ToastOptions } from 'react-toastify';

type Params = {
  type?: string;
  autoClose?: number;
}

export default function useToastNotification() {

  const showNotification = (content: any, params?: Params) => {

    const { type, autoClose = 2000 } = params || {};

    const options:ToastOptions<{}> = {
      position: "top-right",
      autoClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    }

    switch (type) {
      case 'success':
        toast.success(content, options);
        break;
      case 'warn':
        toast.warn(content, options);
        break;
      case 'error':
        toast.error(content, options);
        break;
      case 'dark':
        toast.dark(content, options);
        break;
      case 'info':
      default:
        toast.info(content, options);
        break
    }
  }

  const showErrorNotification = (content: any, params?: Params) => {
    return showNotification(content, { ...params, type: 'error'});
  }

  const showSuccessNotification = (content: any, params?: Params) => {
    return showNotification(content, { ...params, type: 'success'});
  }

  return {
    showNotification,
    showErrorNotification,
    showSuccessNotification
  }
};
