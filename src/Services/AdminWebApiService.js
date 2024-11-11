import axios from "axios";
import AuthorizationService from "./AuthorizationService";
import UrlService from "./UrlService";

const authService = new AuthorizationService();

class WebApiService {
  addAdmin(admin) {
    return axios.post(
      `${UrlService.admin}/users/add`,
      admin
      // authService.getHeathers()
    );
  }
}

const AdminWebApiService = new WebApiService();

export default AdminWebApiService;
