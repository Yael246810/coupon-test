import axios from "axios";
import UrlService from "./UrlService";
import AuthorizationService from "./AuthorizationService";
import mockService from "./MockApiService";

const authService = new AuthorizationService();
mockService.startMocks();

class WebApiService {
  login(email, password) {
    return axios.post(UrlService.auth + "/login", { email, password });
  }

  addCoupon(coupon) {
    return axios.post(`${UrlService.admin}/coupons/add`, coupon);
  }

  deleteCoupon(id) {
    return axios.delete(`${UrlService.admin}/coupons/${id}/delete`);
  }

  updateCoupon(id) {
    return axios.put(`${UrlService.admin}/coupons/${id}/update`, id);
  }

  addUser(user) {
    return axios.post(
      `${UrlService.admin}/user`,
      user,
      authService.getHeaders()
    );
  }

  getAllCoupons() {
    return axios.get(`${UrlService.admin}/coupons`, authService.getHeaders());
  }

  getAllUsers() {
    return axios.get(`${UrlService.admin}/users`, authService.getHeaders());
  }
}

const couponWebApiService = new WebApiService();

export default couponWebApiService;
