import { toast } from "react-toastify";
import { AxiosError } from "axios";

class NotificationService {
  success(msg) {
    toast.success(msg);
  }

  error(msg) {
    toast.error(this.msgFormatter(msg));
  }

  msgFormatter(msg) {
    if (typeof msg === "string") {
      return msg;
    }

    const axiosError = msg;

    if (axiosError && axiosError.response && axiosError.response.data) {
      if (typeof axiosError.response.data === "string") {
        return axiosError.response.data;
      } else if (axiosError.response.data.description) {
        return axiosError.response.data.description;
      }
    }
    return "Something went wrong";
  }
}

const notifyService = new NotificationService();
export default notifyService;
