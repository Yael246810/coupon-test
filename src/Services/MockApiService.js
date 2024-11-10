import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import UrlService from "./UrlService";

class MockApiService {
  constructor() {
    this.mock = new MockAdapter(axios);
    this.coupons = [];
  }

  startMocks() {
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

    this.mock.onPost(UrlService.admin + "/coupons/add").reply((config) => {
      console.log("Mocked POST request to add coupon:", config.data);

      const newCoupon = JSON.parse(config.data);
      this.coupons.push(newCoupon);

      return [
        201,
        {
          message: "Coupon added successfully",
          coupons: this.coupons,
        },
      ];
    });

    this.mock.onGet("/admin/coupons").reply(200, {
      coupons: this.coupons,
    });

    this.mock
      .onDelete(new RegExp(`${UrlService.admin}/coupons/\\d+/delete`))
      .reply((config) => {
        const couponId = config.url.split("/").pop();

        console.log(
          "Mocked DELETE request to delete coupon with ID:",
          couponId
        );

        this.coupons = this.coupons.filter((coupon) => coupon.id !== couponId);

        return [
          204,
          {
            message: "Coupon Deleted successfully",
            coupons: this.coupons,
          },
        ];
      });

    this.mock
      .onPut(new RegExp(`${UrlService.admin}/coupons/\\d+/update`))
      .reply((config) => {
        console.log("mocking update response");

        const couponId = config.url.split("/").pop();
        const updatedCouponData = JSON.parse(config.data);

        console.log("Mocked PUT request to update coupon with ID:", couponId);
        console.log("Updated coupon data:", updatedCouponData);

        let couponFound = false;
        this.coupons = this.coupons.map((coupon) => {
          if (coupon.id === couponId) {
            couponFound = true;
            return { ...coupon, ...updatedCouponData };
          }
          return coupon;
        });

        if (!couponFound) {
          return [404, { message: "Coupon not found" }]; // It falls here, the Update Coupon. To check what to do with it.
        }

        return [
          200,
          {
            message: "Coupon updated successfully",
            coupons: this.coupons,
          },
        ];
      });
  }

  getCoupons() {
    return axios
      .get("/admin/coupons")
      .then((response) => response.data.coupons);
  }

  resetMocks() {
    this.mock.reset();
    this.coupons = [];
  }
}

export default new MockApiService();
