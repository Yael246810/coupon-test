import axios from "axios";
import UrlService from "./UrlService";
import AuthorizationService from "./AuthorizationService";
import mockService from "./MockApiService"; // Adjust the path to where your service is located

const authService = new AuthorizationService();
mockService.startMocks();

class WebApiService {
  login(email, password) {
    return axios.post(UrlService.auth + "/login", { email, password });
  }

  addCoupon(coupon) {
    console.log("web add coupon: " + coupon);
    return axios.post(
      `${UrlService.admin}/coupons/add`,
      coupon //      authService.getHeaders()
    );
  }

  deleteCoupon(id) {
    console.log("delete web coupon: " + id);
    return axios.delete(`${UrlService.admin}/coupons/${id}/delete`);
  }

  updateCoupon(id) {
    return axios.put(`${UrlService.admin}/coupons/${id}/update`, id);
  }

  // Function to add a new user (Customer)
  addUser(user) {
    return axios.post(
      `${UrlService.admin}/user`, // Assuming this is the correct endpoint for adding a user
      user,
      authService.getHeaders()
    );
  }

  // Function to get all coupons
  getAllCoupons() {
    return axios.get(
      `${UrlService.admin}/coupons`, // Assuming this is the correct endpoint for getting all coupons
      authService.getHeaders()
    );
  }

  // Function to get all users (Customer list)
  getAllUsers() {
    return axios.get(
      `${UrlService.admin}/users`, // Assuming this is the correct endpoint for getting all users
      authService.getHeaders()
    );
  }
}

const couponWebApiService = new WebApiService();

export default couponWebApiService;
