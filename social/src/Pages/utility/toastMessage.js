
// create toatify message

import { toast } from 'react-toastify';

const createToaste = (message, type) => {

  switch (type) {
    case "success":
        toast.success(message)
        break;

        case "error":
            toast.error(message)
            break;

        case "warn":
            toast.warn(message)
            break;

        case "info":
            toast.info(message)
            break;
    default:
        break;
  }
}

export default createToaste;