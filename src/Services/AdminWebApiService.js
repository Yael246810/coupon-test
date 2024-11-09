import axios from "axios";
import AuthorizationService from "..Services/AuthorizationService";
import UrlService from "..Services/UrlService";

const authService = new AuthorizationService();

class WebApiService {
  addAdmin(admin) {
    return axios.post(
      `${UrlService.admin}/admin`,
      admin,
      authService.getHeathers()
    );
  }
}

const AdminWebApiService = new WebApiService();

export default AdminWebApiService;
