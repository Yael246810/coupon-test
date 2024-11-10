import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import UrlService from "./UrlService";

class MockApiService {
  constructor() {
    this.mock = new MockAdapter(axios);
    this.coupons = []; // Initialize an empty array to store the coupons
  }

  startMocks() {
    // Mock for login
    this.mock.onPost(UrlService.auth + "/login").reply((config) => {
      console.log("Mocked POST request:", config);
      return [
        200,
        {
          token: "mocked-jwt-token",
          id: 1,
          message: "Login successful",
        },
      ];
    });

    // Mock for adding a coupon
    this.mock.onPost(UrlService.admin + "/coupons/add").reply((config) => {
      console.log("Mocked POST request to add coupon:", config.data);

      // Add the new coupon to the list
      const newCoupon = JSON.parse(config.data);
      this.coupons.push(newCoupon);

      // Return the updated list of coupons
      return [
        200,
        {
          message: "Coupon added successfully",
          coupons: this.coupons, // Send the updated coupon list
        },
      ];
    });

    this.mock.onGet("/admin/coupons").reply(200, {
      coupons: this.coupons, // Return the stored coupons list
    });
  }

  getCoupons() {
    return axios
      .get("/admin/coupons")
      .then((response) => response.data.coupons);
  }

  resetMocks() {
    this.mock.reset();
    this.coupons = []; // Clear the coupons list when resetting mocks
  }
}

export default new MockApiService();